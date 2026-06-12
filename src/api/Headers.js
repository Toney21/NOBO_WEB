const runtimeOrigin =
    typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_CLIENT_HOST_URL || 'http://localhost:3000'

export const CustomHeader = {
    'X-software-id': 33571750,
    'X-server': 'server',
    origin: runtimeOrigin,
}
