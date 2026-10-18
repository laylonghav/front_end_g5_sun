import axios from "axios";
import { configs } from "../config/configs";
import { store } from "@/store/store";

export const request = async (url = "", method = "get", data = {}) => {
  const token = store.getState().token.token;
  // console.log("token", token);
  const headers = {
    "Content-Type": "application/json",
  };

  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  return await axios({
    url: configs.base_url + url,
    method: method,
    data: data,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      console.log("res: ", res);
      return res?.data;
    })
    .catch((error) => {
      console.log("error: ", error.response);
      const errorResponse = error.response;
      if (errorResponse) {
        const status = errorResponse?.status;
        const statusText = errorResponse?.statusText;
        const message = errorResponse?.data?.message;
        if (status) {
          console.log("Status error: ", status);
          console.log("Error: ", statusText);
          console.log("Message error: ", message);
        }
      }
    });
};
