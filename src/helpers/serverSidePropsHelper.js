import { fetchPageMetadata } from '@/utils/fetchPageMetadata'
import {
    normalizeBackendBaseUrl,
    resolveRequestOrigin,
} from '@/utils/runtimeUrls'

const REQUEST_TIMEOUT_MS = 4500

const fetchJsonWithTimeout = async (url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        })

        if (!response.ok) return null
        return await response.json()
    } catch {
        return null
    } finally {
        clearTimeout(timeoutId)
    }
}

/**
 * Fetch common server-side props including config, landing page data, and metadata
 * @param {Object} context - Next.js context object
 * @param {string} pageName - Page name for metadata API (e.g., 'vendor_list', 'category_list')
 * @param {string|number} pageId - Optional page ID for specific items
 * @returns {Promise<Object>} - Props object for the page
 */
export const getCommonServerSideProps = async (context, pageName, pageId = null) => {
    const { req, resolvedUrl, query } = context
    const language = req.cookies?.languageSetting || 'en'
    const domain = req.headers.host
    const protocol =
        domain?.includes('localhost') || domain?.startsWith('127.0.0.1')
            ? 'http'
            : 'https'
    const pathName = `${protocol}://${domain}${resolvedUrl}`
    const baseUrl = normalizeBackendBaseUrl(process.env.NEXT_PUBLIC_BASE_URL)
    
    // Extract ID from query if not provided
    const id = pageId || query?.id
    const headers = {
        'X-software-id': 33571750,
        'X-server': 'server',
        'X-localization': language,
        origin: resolveRequestOrigin(req, process.env.NEXT_CLIENT_HOST_URL),
    }

    const [config, landingPageData, metaData] = await Promise.all([
        baseUrl
            ? fetchJsonWithTimeout(`${baseUrl}/api/v1/config`, {
                  method: 'GET',
                  headers,
              })
            : Promise.resolve(null),
        baseUrl
            ? fetchJsonWithTimeout(`${baseUrl}/api/v1/react-landing-page`, {
                  method: 'GET',
                  headers,
              })
            : Promise.resolve(null),
        fetchPageMetadata(pageName, id, language, req),
    ])
    
    return {
        props: {
            configData: config || null,
            landingPageData: landingPageData || null,
            pathName: pathName,
            metaData: metaData,
        },
    }
}
