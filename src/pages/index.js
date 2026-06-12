import React from 'react'
import LandingPage from '../components/landingpage'
import PushNotificationLayout from '../components/PushNotificationLayout'
import Meta from '../components/Meta'
import { checkMaintenanceMode } from '@/utils/customFunctions'
import { NoSsr } from '@mui/material'
import {
    normalizeBackendBaseUrl,
    resolveRequestOrigin,
} from '@/utils/runtimeUrls'

const REQUEST_TIMEOUT_MS = 6000

const fetchJsonWithTimeout = async (
    url,
    options = {},
    timeoutMs = REQUEST_TIMEOUT_MS
) => {
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

const Home = ({ configData, landingPageData }) => {
    const metaData = landingPageData?.meta_data
    const pageTitle =
        metaData?.meta_data_title || configData?.business_name || 'Home'
    const pageDescription = metaData?.meta_data_description || ''
    const pageImage =
        metaData?.meta_data_image_full_url ||
        (configData?.base_urls?.react_landing_page_images &&
        landingPageData?.banner_section_full?.banner_section_img_full
            ? `${configData.base_urls.react_landing_page_images}/${landingPageData.banner_section_full.banner_section_img_full}`
            : '/default-og-image.jpg')

    const robotsMeta = metaData
        ? {
              meta_index: metaData.meta_data_index,
              meta_no_follow: metaData.meta_data_no_follow,
              meta_no_image_index: metaData.meta_data_no_image_index,
              meta_no_archive: metaData.meta_data_no_archive,
              meta_no_snippet: metaData.meta_data_no_snippet,
              meta_max_snippet: metaData.meta_data_max_snippet,
              meta_max_snippet_value: metaData.meta_data_max_snippet_value,
              meta_max_video_preview: metaData.meta_data_max_video_preview,
              meta_max_video_preview_value:
                  metaData.meta_data_max_video_preview_value,
              meta_max_image_preview: metaData.meta_data_max_image_preview,
              meta_max_image_preview_value:
                  metaData.meta_data_max_image_preview_value,
          }
        : null

    return (
        <>
            <Meta
                title={pageTitle}
                description={pageDescription}
                ogImage={pageImage}
                robotsMeta={robotsMeta}
            />
            <PushNotificationLayout>
                <NoSsr>
                    <LandingPage
                        global={configData}
                        landingPageData={landingPageData}
                    />
                </NoSsr>
            </PushNotificationLayout>
        </>
    )
}

export default Home

export const getServerSideProps = async (context) => {
    const { req } = context
    const language = req.cookies?.languageSetting || 'en'
    const baseUrl = normalizeBackendBaseUrl(process.env.NEXT_PUBLIC_BASE_URL)
    const headers = {
        'X-Software-Id': '33571750',
        'X-Server': 'server',
        'X-Localization': language,
        Origin: resolveRequestOrigin(
            req,
            process.env.NEXT_CLIENT_HOST_URL || 'http://localhost:3000'
        ),
    }

    let configData = null
    let landingPageData = null

    if (baseUrl) {
        ;[configData, landingPageData] = await Promise.all([
            fetchJsonWithTimeout(`${baseUrl}/api/v1/config`, {
                method: 'GET',
                headers,
                cache: 'no-store',
            }),
            fetchJsonWithTimeout(`${baseUrl}/api/v1/react-landing-page`, {
                method: 'GET',
                headers,
                cache: 'no-store',
            }),
        ])
    }

    if (configData && checkMaintenanceMode(configData)) {
        return {
            redirect: {
                destination: '/maintenance',
                permanent: false,
            },
        }
    }

    return {
        props: {
            configData: configData || null,
            landingPageData: landingPageData || null,
        },
    }
}
