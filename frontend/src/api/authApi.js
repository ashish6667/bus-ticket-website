import axios from "axios";

const API = axios.create({
  baseURL: "/api", // relative path works because of proxy
});

export const registerUser = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};
