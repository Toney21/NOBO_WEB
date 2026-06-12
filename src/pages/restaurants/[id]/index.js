import React, { useEffect } from 'react'
import { NoSsr } from '@mui/material'
import RestaurantDetails from '../../../components/restaurant-details/RestaurantDetails'
import Meta from '../../../components/Meta'
import MainApi from '../../../api/MainApi'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setGlobalSettings } from '@/redux/slices/global'

const REQUEST_TIMEOUT_MS = 5000

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

const normalizeRestaurantCollection = (response) => {
    if (Array.isArray(response?.restaurants)) {
        return response.restaurants
    }

    if (Array.isArray(response?.data?.restaurants)) {
        return response.data.restaurants
    }

    if (Array.isArray(response?.data)) {
        return response.data
    }

    return []
}

const findRestaurantMatch = (restaurants = [], identifier) => {
    const normalizedIdentifier = `${identifier}`.trim()
    const numericIdentifier = Number(normalizedIdentifier)

    return restaurants.find((restaurant) => {
        if (!restaurant) return false

        return (
            `${restaurant?.id}` === normalizedIdentifier ||
            `${restaurant?.slug}` === normalizedIdentifier ||
            (Number.isFinite(numericIdentifier) &&
                Number(restaurant?.id) === numericIdentifier)
        )
    })
}

const loadRestaurantSnapshot = async (identifier) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')
    const headers = {
        'X-software-id': 33571750,
        'X-server': 'server',
        'X-localization': 'en',
        origin: process.env.NEXT_CLIENT_HOST_URL,
    }

    const restaurantList = baseUrl
        ? await fetchJsonWithTimeout(
              `${baseUrl}/api/v1/restaurants/get-restaurants/all?offset=1&limit=1000`,
              {
                  method: 'GET',
                  headers,
              }
          )
        : null

    const listMatch = findRestaurantMatch(
        normalizeRestaurantCollection(restaurantList),
        identifier
    )
    if (listMatch) {
        return listMatch
    }

    let detailData = null
    try {
        const detailResponse = await MainApi.get(
            `/api/v1/restaurants/details/${identifier}`,
            {
                timeout: 12000,
            }
        )
        detailData = detailResponse?.data || null
    } catch {
        detailData = null
    }
    if (detailData && Object.keys(detailData).length > 0) {
        return detailData
    }

    return null
}

const RestaurantDetailsPage = ({ restaurantData, configData }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setGlobalSettings(configData))
    }, [])

    useEffect(() => {
        if (configData) {
            if (configData.maintenance_mode) {
                router.push('/maintenance')
            }
        }
    }, [configData, router])


    // Process metadata from restaurantData
    const pageTitle = restaurantData?.meta_title
        ? `${restaurantData.meta_title} - ${configData?.business_name}`
        : `${restaurantData?.name} - ${configData?.business_name}`
    const pageDescription = restaurantData?.meta_description || ''
    const pageImage = restaurantData?.meta_image_full_url ||
        `${configData?.base_urls?.restaurant_image_url}/${restaurantData?.meta_image}`
    console.log({ restaurantData });

    return (
        <>
            <Meta
                title={pageTitle}
                description={pageDescription}
                ogImage={pageImage}
                robotsMeta={restaurantData?.meta_data}
            />
            <NoSsr>
                <RestaurantDetails restaurantData={restaurantData} />
            </NoSsr>
        </>
    )
}

export default RestaurantDetailsPage

export async function getServerSideProps(context) {
    const id = context.params.slug || context.params.id

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')
        const headers = {
            'X-software-id': 33571750,
            'X-server': 'server',
            'X-localization': 'en',
            origin: process.env.NEXT_CLIENT_HOST_URL,
        }

        const [restaurantData, config] = await Promise.all([
            loadRestaurantSnapshot(id),
            baseUrl
                ? fetchJsonWithTimeout(`${baseUrl}/api/v1/config`, {
                      method: 'GET',
                      headers,
                  })
                : Promise.resolve(null),
        ])

        if (!restaurantData) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                restaurantData,
                configData: config,
            },
        }
    } catch (error) {
        console.error('Error fetching restaurants data:', error)
        return {
            notFound: true,
        }
    }
}

