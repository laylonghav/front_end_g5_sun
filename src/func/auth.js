import { request } from "@/utility/helper/request";

export const login = async (data) => {
  const res = await request("login", "post", data);
  return res;
};

export const logout = async (data) => {
  const res = await request("auth/logout", "post", data);
  return res;
};
