import axios from "axios";

//const API_URL = "/api/users/";

export const register = async (userData) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const login = async (userData) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const getToken = () => {
  return getUser().token;
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
