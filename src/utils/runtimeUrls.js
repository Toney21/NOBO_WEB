const trimTrailingSlash = (value = '') => `${value}`.trim().replace(/\/+$/, '')

export const normalizeBackendBaseUrl = (value = '') => {
    const trimmed = trimTrailingSlash(value)

    if (!trimmed) {
        return 'https://www.nobo.co.ke'
    }

    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(trimmed)) {
        return `${trimmed}/nob/public`
    }

    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/nob$/i.test(trimmed)) {
        return `${trimmed}/public`
    }

    if (/^http:\/\//i.test(trimmed)) {
        throw new Error('Insecure backend URL is not allowed outside localhost.')
    }

    return trimmed
}

export const resolveRequestOrigin = (req, fallback = '') => {
    const trimmedFallback = trimTrailingSlash(fallback)
    if (trimmedFallback) {
        return trimmedFallback
    }

    const host = req?.headers?.host
    if (!host) {
        return 'http://localhost:3000'
    }

    const protocol =
        host.includes('localhost') || host.startsWith('127.0.0.1')
            ? 'http'
            : 'https'

    return `${protocol}://${host}`
}
