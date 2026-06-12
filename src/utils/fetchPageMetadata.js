
import {
    normalizeBackendBaseUrl,
    resolveRequestOrigin,
} from '@/utils/runtimeUrls'

const REQUEST_TIMEOUT_MS = 5000

const isAbortError = (error) =>
    error?.name === 'AbortError' || error?.code === 20 || error?.code === 'ABORT_ERR'

const fetchWithTimeout = async (url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
        return await fetch(url, { ...options, signal: controller.signal })
    } finally {
        clearTimeout(timeoutId)
    }
}

export const fetchPageMetadata = async (
    pageName,
    id = null,
    language = 'en',
    req = null
) => {
    try {
        const baseUrl = normalizeBackendBaseUrl(process.env.NEXT_PUBLIC_BASE_URL)
        if (!baseUrl || !pageName) return null

        const encodedPageName = encodeURIComponent(pageName)
        const encodedId = id !== null ? encodeURIComponent(id) : null
        const url = encodedId
            ? `${baseUrl}/api/v1/get-page-meta-data?page_name=${encodedPageName}&id=${encodedId}`
            : `${baseUrl}/api/v1/get-page-meta-data?page_name=${encodedPageName}`

        const metaRes = await fetchWithTimeout(url, {
            method: 'GET',
            headers: {
                'X-software-id': 33571750,
                'X-server': 'server',
                'X-localization': language,
                origin: resolveRequestOrigin(req, process.env.NEXT_CLIENT_HOST_URL),
            },
        })

        if (!metaRes.ok) return null
        return await metaRes.json()
    } catch (error) {
        if (isAbortError(error)) return null
        console.error('Failed to fetch page metadata:', error)
        return null
    }
}


export const processMetadata = (metaData, fallback = {}) => {
    return {
        title: metaData?.title || fallback.title || '',
        description: metaData?.description || fallback.description || '',
        image: metaData?.image_full_url || fallback.image || '',
        robotsMeta: metaData?.meta_data || null,
    }
}
