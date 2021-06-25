import axios from "axios";
import { isValidUser } from "../helpers/validators";

export const BACKEND_URL = "https://nest-test-backend.herokuapp.com";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export const listAllUser = async () => {
  try {
    return  (
      await axiosInstance.get("/users")
    ).data;
  } catch (error) {
    console.error({ error });
    return [];
  }
};

export const storeUser = async (user) => {
  if (!isValidUser(user))
    // Protect integrity of DTO
    return null;

  try {
    return (await axiosInstance.post("/users", user)).data;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    return await (
      await axiosInstance.delete("/users/" + id)
    ).data;
  } catch (error) {
    return [];
  }
};
