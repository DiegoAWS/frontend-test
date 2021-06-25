import axios from "axios";

export const BACKEND_URL = "https://nest-test-backend.herokuapp.com";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export const listAllUser = async () => {
  return (await axiosInstance.get("/users")).data;
};

export const storeUser = async (user) => {
  return (await axiosInstance.post("/users", user)).data;
};

export const deleteUser = async (id) => {
  return (await axiosInstance.delete("/users/" + id)).status;
};
