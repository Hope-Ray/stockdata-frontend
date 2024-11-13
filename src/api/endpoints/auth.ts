import axiosInstance from "../axiosInstance";

export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
};

export const registerUser = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/register", credentials);
};
