const path = require('path')

const corporateBackendBaseUrl =
    process.env.NEXT_PUBLIC_CORPORATE_BACKEND_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'http://localhost/nob'

const lisaBackendBaseUrl =
    process.env.NEXT_PUBLIC_LISA_BACKEND_BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'http://localhost/nob'

const cleanLisaBackendBaseUrl = lisaBackendBaseUrl.replace(/\/+$/, '')

module.exports = {
    reactStrictMode: true,
    outputFileTracingRoot: path.resolve(__dirname),
    images: {
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
};
