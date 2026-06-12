import React from 'react'
import { NoSsr } from '@mui/material'
import WishList from '../../components/wishlist-page/WishList'
import Meta from '../../components/Meta'
import PushNotificationLayout from '../../components/PushNotificationLayout'
import { CustomHeader } from '@/api/Headers'
import {
    normalizeBackendBaseUrl,
    resolveRequestOrigin,
} from '@/utils/runtimeUrls'

const index = ({ configData }) => {
    return (
        <div className="div">
            <Meta title={`My Wish list - ${configData?.business_name}`} />
            <NoSsr>
                <PushNotificationLayout>
                    <WishList />
                </PushNotificationLayout>
            </NoSsr>
        </div>
    )
}

export default index
export const getServerSideProps = async ({ req }) => {
    const baseUrl = normalizeBackendBaseUrl(process.env.NEXT_PUBLIC_BASE_URL)
    const configRes = await fetch(
        `${baseUrl}/api/v1/config`,
        {
            method: 'GET',
            headers: {
                ...CustomHeader,
                origin: resolveRequestOrigin(req, process.env.NEXT_CLIENT_HOST_URL),
            },
        }
    )
    const config = await configRes.json()
    return {
        props: {
            configData: config,
        },
    }
}
