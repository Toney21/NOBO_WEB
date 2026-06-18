
import { useMutation } from "react-query";
import MainApi from "../../../api/MainApi";

const deleteData = async () => {
  const { data } = await MainApi.delete("api/v1/customer/cart/remove");
  return data;
};

export default function useDeleteAllCartItem() {
  return useMutation("delete-all-cart-item", deleteData);
}
