import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3700/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const SetAuthorizationHeader = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
