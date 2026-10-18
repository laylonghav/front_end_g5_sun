import { request } from "@/utility/helper/request";

const searchData = async (query) => {
  const res = await request(`category_v1/search?query=${query}`, "get");
  return res;
};

const getData = async () => {
  const res = await request("category_v1", "get");
  return res;
};

const createData = async (data) => {
  const res = await request("category_v1", "post", data);
  return res;
};

const updateData = async (id, data) => {
  const res = await request(`category_v1/${id}`, "put", data);
  return res;
};

const deleteData = async (id) => {
  const res = await request(`category_v1/${id}`, "delete");
  return res;
};

export { searchData, getData, createData, updateData, deleteData };
