import { useQuery } from "react-query";
import MainApi from "../../../api/MainApi";
import { onErrorResponse } from "@/components/ErrorResponse";
import { getToken } from "@/components/checkout-page/functions/getGuestUserId";

export default function useGetAllCartList(cartListSuccessHandler) {
  const getData = async () => {
    try {
      const { data } = await MainApi.get("api/v1/customer/cart/list");
      return data;
    } catch (error) {
      throw error; // Rethrow the error to be caught by React Query
    }
  };

  return useQuery("cart-item", getData, {
    onSuccess: cartListSuccessHandler,
    enabled: Boolean(getToken()),
    onError: onErrorResponse,
    refetchOnWindowFocus: false,

  });
}
