const path = require('path')

const corporateBackendBaseUrl =
    process.env.NEXT_PUBLIC_CORPORATE_BACKEND_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'https://www.nobo.co.ke'

const lisaBackendBaseUrl =
    process.env.NEXT_PUBLIC_LISA_BACKEND_BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://www.nobo.co.ke'

const cleanLisaBackendBaseUrl = lisaBackendBaseUrl.replace(/\/+$/, '')
const apiProxyTarget = (
    process.env.NEXT_PUBLIC_API_PROXY_TARGET ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://www.nobo.co.ke'
).replace(/\/+$/, '')

module.exports = {
    reactStrictMode: true,
    outputFileTracingRoot: path.resolve(__dirname),
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60 * 60 * 24,
        deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
        imageSizes: [48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '**', // allows all https domains
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**', // allows all https domains
                pathname: '/**',
            },
        ],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            nanoclone: path.resolve(__dirname, 'build-shims/nanoclone.js'),
        }

        return config
    },
    async redirects() {
        return [
            {
                source: '/corporate/Corporate/login',
                destination: `${corporateBackendBaseUrl}/login/corporate`,
                permanent: false,
            },
            {
                source: '/corporate/login',
                destination: `${corporateBackendBaseUrl}/login/corporate`,
                permanent: false,
            },
            {
                source: '/corporates',
                destination: `${corporateBackendBaseUrl}/corporates`,
                permanent: false,
            },
            {
                source: '/corporate/:path*',
                destination: `${corporateBackendBaseUrl}/corporate/:path*`,
                permanent: false,
            },
            {
                source: '/lisa',
                destination: `${cleanLisaBackendBaseUrl}/lisa/home`,
                permanent: false,
            },
            {
                source: '/lisa/:path*',
                destination: `${cleanLisaBackendBaseUrl}/lisa/:path*`,
                permanent: false,
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: `${apiProxyTarget}/api/v1/:path*`,
            },
        ]
    },
};
