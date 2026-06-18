import Router from 'next/router'
import { setWelcomeModal } from '@/redux/slices/utils'
import { removeToken } from '@/redux/slices/userToken'
import { store } from '@/redux/store'
import { getToken, removeAuthToken } from '@/utils/localStorage'
import {
    CustomToaster,
    CustomToasterTokenExpired,
} from './custom-toaster/CustomToaster'

const handleTokenExpire = (status) => {
    if (status === 401 && getToken()) {
        CustomToasterTokenExpired(
            'Session expired',
            'Please sign in again to continue.'
        )
        removeAuthToken()
        store.dispatch(removeToken())
        store.dispatch(setWelcomeModal(false))
        Router.push('/home')
    }
}

const getErrorMessages = (error) => {
    const errors = error?.response?.data?.errors
    if (Array.isArray(errors)) {
        return errors.map((item) => item?.message).filter(Boolean)
    }

    const message = error?.response?.data?.message
    return message ? [message] : []
}

export const onErrorResponse = (error) => {
    getErrorMessages(error).forEach((message) => {
        CustomToaster('error', message)
    })
    handleTokenExpire(error?.response?.status)
}

export const onSingleErrorResponse = (error) => {
    const [message] = getErrorMessages(error)
    if (message) {
        CustomToaster('error', message)
    }
    handleTokenExpire(error?.response?.status)
}

export const onSilentErrorResponse = (error) => {
    handleTokenExpire(error?.response?.status)
}
