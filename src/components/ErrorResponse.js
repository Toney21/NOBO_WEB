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
    if (status === 401) {
        if (getToken()) {
            CustomToasterTokenExpired(
                'Session Time Out',
                'Though it is a demo site, our system automatically reset after one hour and that’s why you logged out'
            )
            removeAuthToken()
            store.dispatch(removeToken())
            store.dispatch(setWelcomeModal(false))
            Router.push('/home')
        }
    }
}

export const onErrorResponse = (error) => {
    error?.response?.data?.errors?.forEach((item) => {
        CustomToaster('error', item?.message)
    })
    handleTokenExpire(error?.response?.status)
}
export const onSingleErrorResponse = (error) => {
    CustomToaster('error', error?.response?.data?.message)
    handleTokenExpire(error?.response?.status)
}
