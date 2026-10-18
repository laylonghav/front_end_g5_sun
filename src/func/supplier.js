import { request } from "@/utility/helper/request";

const searchData = async (query) => {
  const res = await request(`supplier/search?query=${query}`, "get");
  return res;
};

const getData = async () => {
  const res = await request("supplier", "get");
  return res;
};

const createData = async (data) => {
  const res = await request("supplier", "post", data);
  return res;
};
const ImportData = async (data) => {
  const res = await request("supplier/bluk", "post", data);
  return res;
};

const updateData = async (id, data) => {
  const res = await request(`supplier/${id}`, "put", data);
  return res;
};

const deleteData = async (id) => {
  const res = await request(`supplier/${id}`, "delete");
  return res;
};

export { searchData, getData, createData, updateData, deleteData, ImportData };
