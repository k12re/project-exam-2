import { load } from "../Storage";

export function headers() {
  const token = load("accessToken");

  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const AuthFetch = async (url: string, options = {}) => {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
};
