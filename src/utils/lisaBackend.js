import {
    getFromLocalStorage,
    getSessionStorageItem,
    getToken,
    removeFromLocalStorage,
    setToSessionStorage,
} from '@/utils/localStorage'

const lisaBackendBaseUrl =
    process.env.NEXT_PUBLIC_LISA_BACKEND_BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : '') ||
    'https://www.nobo.co.ke'

const cleanBaseUrl = lisaBackendBaseUrl.replace(/\/+$/, '')
const lisaProfileCacheTtlMs = 30000
let lisaProfileCache = null
let lisaProfileCacheAt = 0
let lisaControllerStateCache = null
let lisaControllerStateCacheAt = 0

const normalizeLisaPath = (path = 'home') => {
    const nextPath = String(path || 'home')
        .replace(/^\/+/, '')
        .replace(/^lisa\/?/, '')

    return nextPath || 'home'
}

const readLisaToken = () => {
    if (typeof window === 'undefined') {
        return ''
    }

    const lisaSessionToken = getSessionStorageItem('lisa-customer-token')
    if (lisaSessionToken) {
        return lisaSessionToken
    }

    const lisaLegacyToken = getFromLocalStorage('lisa-customer-token')
    if (lisaLegacyToken) {
        setToSessionStorage('lisa-customer-token', lisaLegacyToken)
        removeFromLocalStorage('lisa-customer-token')
        return lisaLegacyToken
    }

    return getToken() || ''
}

const splitLisaPath = (path = 'home') => {
    const normalizedPath = normalizeLisaPath(path)
    const [basePath, search = ''] = normalizedPath.split('?')

    return {
        basePath: basePath || 'home',
        search,
    }
}

const getLisaProfilePayload = (response) => {
    if (!response || typeof response !== 'object') {
        return {}
    }

    if (response.profile && typeof response.profile === 'object') {
        return response.profile
    }

    return response
}

const asObject = (value) =>
    value && typeof value === 'object' && !Array.isArray(value) ? value : {}

const asArray = (value) => (Array.isArray(value) ? value : [])

const getStringValue = (value) => {
    if (typeof value !== 'string') {
        return ''
    }

    return value.trim()
}

const getStringList = (value) => {
    if (!Array.isArray(value)) {
        return []
    }

    return value
        .map((item) => getStringValue(item))
        .filter(Boolean)
}

export const hasLisaGoalSetup = (profile = {}) =>
    getStringValue(profile?.goal_type).length > 0

export const hasLisaHealthChoices = (profile = {}) => {
    const dietaryPreference = getStringValue(profile?.dietary_preference)
    const dietaryGuardrails = getStringList(profile?.dietary_guardrails)

    return (
        hasLisaGoalSetup(profile) ||
        (dietaryPreference.length > 0 && dietaryPreference !== 'none') ||
        dietaryGuardrails.length > 0
    )
}

export const shouldRouteLisaHomeToSettings = (profile = {}) =>
    !hasLisaGoalSetup(profile)

const getLisaRoutedPath = (path = 'home', profile = {}) => {
    const { basePath, search } = splitLisaPath(path)

    if (basePath !== 'home' || !shouldRouteLisaHomeToSettings(profile)) {
        return normalizeLisaPath(path)
    }

    return search ? `settings?${search}` : 'settings'
}

export const getLisaBackendUrl = (path = 'home', { includeToken = true } = {}) => {
    const url = `${cleanBaseUrl}/lisa/${normalizeLisaPath(path)}`

    if (!includeToken || typeof window === 'undefined') {
        return url
    }

    return url
}

export const openLisaBackend = (path = 'home', options) => {
    if (typeof window === 'undefined') {
        return
    }

    window.location.href = getLisaBackendUrl(path, options)
}

export const fetchLisaBackendJson = async (path = 'ai/profile') => {
    const token = readLisaToken()
    if (!token) {
        return null
    }

    const cleanPath = String(path || 'ai/profile').replace(/^\/+/, '')
    if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        throw new Error('Insecure browser origin is not allowed.')
    }
    const response = await fetch(`${cleanBaseUrl}/api/v1/${cleanPath}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Lisa request failed: ${response.status}`)
    }

    return response.json()
}

const resolveLisaControllerError = (...errors) => {
    for (const error of errors) {
        const message = getStringValue(error)
        if (message) {
            return message
        }
    }

    return ''
}

export const fetchLisaControllerState = async ({ forceRefresh = false } = {}) => {
    const token = readLisaToken()
    if (!token) {
        return null
    }

    const now = Date.now()
    if (
        !forceRefresh &&
        lisaControllerStateCache &&
        now - lisaControllerStateCacheAt < lisaProfileCacheTtlMs
    ) {
        return lisaControllerStateCache
    }

    const [profileResult, homeResult, alertsResult, settingsResult] =
        await Promise.allSettled([
            fetchLisaBackendJson('ai/profile'),
            fetchLisaBackendJson('ai/home-content'),
            fetchLisaBackendJson('ai/alerts'),
            fetchLisaBackendJson('ai/settings'),
        ])

    const profileResponse =
        profileResult.status === 'fulfilled' ? profileResult.value : null
    const homeResponse = homeResult.status === 'fulfilled' ? homeResult.value : null
    const alertsResponse =
        alertsResult.status === 'fulfilled' ? alertsResult.value : null
    const settingsResponse =
        settingsResult.status === 'fulfilled' ? settingsResult.value : null

    const settingsProfile = asObject(settingsResponse?.profile)
    const profile = {
        ...asObject(getLisaProfilePayload(profileResponse)),
        ...settingsProfile,
    }

    const controllerState = {
        profile,
        homeContent: asObject(homeResponse),
        alerts: asArray(alertsResponse?.items),
        settings: asObject(settingsResponse?.settings),
        settingsOptions: asObject(settingsResponse?.options),
        settingsNote: getStringValue(settingsResponse?.note),
        walletBalance: Number(settingsResponse?.wallet_balance || 0),
        autopilotMinWalletBalance: Number(
            settingsResponse?.autopilot_min_wallet_balance || 0
        ),
        hasLoaded: Boolean(profileResult.status === 'fulfilled' && homeResult.status === 'fulfilled'),
        errorMessage:
            profileResult.status === 'rejected' || homeResult.status === 'rejected' || alertsResult.status === 'rejected' || settingsResult.status === 'rejected'
                ? resolveLisaControllerError(
                      profileResult.status === 'rejected'
                          ? profileResult.reason?.message
                          : '',
                      homeResult.status === 'rejected'
                          ? homeResult.reason?.message
                          : '',
                      alertsResult.status === 'rejected'
                          ? alertsResult.reason?.message
                          : '',
                      settingsResult.status === 'rejected'
                          ? settingsResult.reason?.message
                          : ''
                  )
                : '',
    }

    lisaControllerStateCache = controllerState
    lisaControllerStateCacheAt = now
    lisaProfileCache = profile
    lisaProfileCacheAt = now

    return controllerState
}

export const fetchLisaProfile = async ({ forceRefresh = false } = {}) => {
    const controllerState = await fetchLisaControllerState({
        forceRefresh,
    })

    return controllerState?.profile || null
}

export const openLisaExperience = async (
    path = 'home',
    options = {}
) => {
    if (typeof window === 'undefined') {
        return
    }

    const { forceRefreshProfile = false, ...urlOptions } = options

    try {
        const profile = await fetchLisaProfile({
            forceRefresh: forceRefreshProfile,
        })
        const routedPath = profile
            ? getLisaRoutedPath(path, profile)
            : normalizeLisaPath(path)
        window.location.href = getLisaBackendUrl(routedPath, urlOptions)
    } catch (error) {
        window.location.href = getLisaBackendUrl(path, urlOptions)
    }
}
