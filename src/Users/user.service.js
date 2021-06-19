import axios from "axios";
import { isValidUser } from "./user.validators";

const BACKEND_URL = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export const listAllUser = async () => {
  try {
    const data = await axiosInstance.get("/users");
    const users = data.data;

    return users;
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
    const data = await axiosInstance.get("/users");
    const users = data.data;

    return users;
  } catch (error) {
    console.error({ error });
    return [];
  }
};
