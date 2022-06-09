import axios from "axios";
import { LoginValues } from "../pages/login";
import { RegistrationValues } from "../pages/register";

export const submitRegistration = async (info: RegistrationValues) => {
  try {
    const { confirmPassword, ...user } = info;
    const result = await axios.post("/api/user/register", { user });
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const login = async (info: LoginValues) => {
  const { username, password } = info;
  try {
    const result = await axios.post("/api/user/authenticate", {
      username,
      password,
    });
    return result;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    await axios.get("/api/user/logout");
  } catch (error: any) {
    throw error;
  }
};
