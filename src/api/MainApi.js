import axios from 'axios'
import { normalizeBackendBaseUrl } from '@/utils/runtimeUrls'
import {
    getCurrentLatLng,
    getFromLocalStorage,
    getSessionStorageItem,
    getToken,
    getZoneId,
} from '@/utils/localStorage'

export const baseUrl = normalizeBackendBaseUrl(process.env.NEXT_PUBLIC_BASE_URL)

const MainApi = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
})

const safelyParseJson = (value) => {
    if (!value) return undefined

    try {
        return JSON.parse(value)
    } catch {
        return undefined
    }
}

const normalizeZoneHeader = (value) => {
    const parsed = safelyParseJson(value) ?? value
    const zoneIds = Array.isArray(parsed) ? parsed : [parsed]
    const normalized = zoneIds
        .map((zoneId) => Number(zoneId))
        .filter((zoneId) => Number.isFinite(zoneId) && zoneId > 0)

    return normalized.length > 0 ? JSON.stringify(normalized) : undefined
}

MainApi.interceptors.request.use(function (config) {
    let zoneId = undefined
    let token = undefined
    let language = undefined
    let currentLocation = undefined
    let software_id = 33571750

    if (typeof window !== 'undefined') {
        zoneId = getSessionStorageItem('zoneid') || getZoneId()
        token = getToken()
        language = getSessionStorageItem('language') || getFromLocalStorage('language')
        currentLocation =
            safelyParseJson(getSessionStorageItem('currentLatLng')) ||
            getCurrentLatLng()
    }
    if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        throw new Error('Insecure browser origin is not allowed.')
    }
    config.headers.latitude = currentLocation?.lat || 0
    config.headers.longitude = currentLocation?.lng || 0
    const normalizedZoneId = normalizeZoneHeader(zoneId)
    if (normalizedZoneId) config.headers.zoneId = normalizedZoneId
    if (token) config.headers.authorization = `Bearer ${token}`
    if (language) config.headers['X-localization'] = language
    config.headers['X-software-id'] = software_id
    config.headers["ngrok-skip-browser-warning"] = true;

    return config
})
export default MainApi
