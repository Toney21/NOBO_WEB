import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'
import { onSilentErrorResponse } from '@/components/ErrorResponse'

export const getData = async () => {
    const { data } = await MainApi.get('/api/v1/restaurants/recommended')
    return data
}
export const useRecommendedRestaurant = (handleSuccess) => {
    return useQuery('recommended-restaurants', () => getData(), {
        enabled: false,
        onError: onSilentErrorResponse,
        retry: 1,
        onSuccess: handleSuccess,
        cacheTime: 500,
    })
}
