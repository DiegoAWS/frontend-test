import axios from "axios";
import { isValidUser } from "../helpers/validators";

const BACKEND_URL = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export const listAllUser = async () => {
  try {
    return await (
      await axiosInstance.get("/users")
    ).data;
  } catch (error) {
    console.error({ error });
    return [];
  }
};

export const createUser = async (user) => {
  if (!isValidUser(user))
    // Protect integrity of DTO
    return [];

  try {
    return await (
      await axiosInstance.post("/users", user)
    ).data;
  } catch (error) {
    console.error({ error });
    return [];
  }
};
