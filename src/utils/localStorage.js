// Safe localStorage access for SSR compatibility

const AUTH_TOKEN_KEY = 'token'

const canUseBrowserStorage = () => typeof window !== 'undefined'

export const getSessionStorageItem = (key, defaultValue = null) => {
    if (canUseBrowserStorage()) {
        try {
            const item = window.sessionStorage.getItem(key)
            return item !== null ? item : defaultValue
        } catch (error) {
            console.error(`Error reading sessionStorage key "${key}":`, error)
            return defaultValue
        }
    }
    return defaultValue
}

export const setToSessionStorage = (key, value) => {
    if (canUseBrowserStorage()) {
        try {
            window.sessionStorage.setItem(key, value)
            return true
        } catch (error) {
            console.error(`Error setting sessionStorage key "${key}":`, error)
            return false
        }
    }
    return false
}

export const removeFromSessionStorage = (key) => {
    if (canUseBrowserStorage()) {
        try {
            window.sessionStorage.removeItem(key)
            return true
        } catch (error) {
            console.error(`Error removing sessionStorage key "${key}":`, error)
            return false
        }
    }
    return false
}

export const getFromLocalStorage = (key, defaultValue = null) => {
    if (canUseBrowserStorage()) {
        try {
            const item = localStorage.getItem(key)
            return item !== null ? item : defaultValue
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error)
            return defaultValue
        }
    }
    return defaultValue
}

export const setToLocalStorage = (key, value) => {
    if (canUseBrowserStorage()) {
        try {
            localStorage.setItem(key, value)
            return true
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
            return false
        }
    }
    return false
}

export const removeFromLocalStorage = (key) => {
    if (canUseBrowserStorage()) {
        try {
            localStorage.removeItem(key)
            return true
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error)
            return false
        }
    }
    return false
}

export const clearLocalStorage = () => {
    if (canUseBrowserStorage()) {
        try {
            localStorage.clear()
            return true
        } catch (error) {
            console.error('Error clearing localStorage:', error)
            return false
        }
    }
    return false
}

// Specific getters for commonly used values
export const getLanguageDirection = () => getFromLocalStorage('direction', 'ltr')
export const getZoneId = () => getFromLocalStorage('zoneid')
export const getToken = () => {
    if (!canUseBrowserStorage()) {
        return null
    }

    const sessionToken = getSessionStorageItem(AUTH_TOKEN_KEY)
    if (sessionToken) {
        return sessionToken
    }

    const legacyToken = getFromLocalStorage(AUTH_TOKEN_KEY)
    if (legacyToken) {
        setToSessionStorage(AUTH_TOKEN_KEY, legacyToken)
        removeFromLocalStorage(AUTH_TOKEN_KEY)
        return legacyToken
    }

    return null
}

export const setAuthToken = (token) => {
    if (!token) {
        removeAuthToken()
        return false
    }

    removeFromLocalStorage(AUTH_TOKEN_KEY)
    const stored = setToSessionStorage(AUTH_TOKEN_KEY, token)
    if (stored && canUseBrowserStorage()) {
        window.dispatchEvent(new CustomEvent('nobo:auth-changed'))
    }
    return stored
}

export const removeAuthToken = () => {
    const removedSession = removeFromSessionStorage(AUTH_TOKEN_KEY)
    const removedLocal = removeFromLocalStorage(AUTH_TOKEN_KEY)
    if ((removedSession || removedLocal) && canUseBrowserStorage()) {
        window.dispatchEvent(new CustomEvent('nobo:auth-changed'))
    }
    return removedSession || removedLocal
}

export const getGuestId = () => null
export const getCurrentLatLng = () => {
    const value = getFromLocalStorage('currentLatLng')
    try {
        return value ? JSON.parse(value) : null
    } catch {
        return null
    }
}
