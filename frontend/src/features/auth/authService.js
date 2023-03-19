import axios from "axios";

const API_URL = "/api/users/";

//Signing up user
const signup = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Log-in User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Log-out User
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
