import { getToken as getAuthToken } from '@/utils/localStorage'

export const getGuestId = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("guest_id");
  }
};
export const getToken = () => {
  return getAuthToken()
};
