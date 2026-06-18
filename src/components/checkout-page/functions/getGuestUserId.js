import { getToken as getAuthToken } from '@/utils/localStorage'

export const getGuestId = () => {
  return null;
};
export const getToken = () => {
  return getAuthToken()
};
