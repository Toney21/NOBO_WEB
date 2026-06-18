import { useInfiniteQuery } from 'react-query'

import MainApi from '../../../api/MainApi'
import { onErrorResponse } from '@/components/ErrorResponse'

const getData = async (params, pageParam) => {
    const { filterByData, page_limit, filterType, searchKey } = params
    const { data } = await MainApi.get(
        `/api/v1/restaurants/get-restaurants/all?offset=${pageParam}&limit=${page_limit}&filter_data=${filterType}&name=${searchKey}&veg=${
            filterByData?.veg ? 1 : 0
        }&discount=${filterByData?.discount ? 1 : 0}&non_veg=${
            filterByData?.non_veg ? 1 : 0
        }&top_rated=${filterByData?.top_rated ? 1 : 0}`
    )
    return data
}
export const useGetRestaurant = (params, handleSuccess) => {
    const { filterByData, offset, page_limit, filterType, searchKey } = params
    return useInfiniteQuery(
        ['restaurants', filterByData, filterType, searchKey, page_limit],
        ({ pageParam = params.offset }) => getData(params, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = allPages.length + 1

                return lastPage?.restaurants?.length > 0 ? nextPage : undefined
            },
            enabled: false,
            onError: onErrorResponse,
            cacheTime: '0',
            retry: 1,
            //onSuccess:handleSuccess
        }
    )
}
