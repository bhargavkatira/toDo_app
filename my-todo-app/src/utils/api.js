import axios from "axios";
const headers = {
  // 'x-auth-token': '',
  Accept: "application/json",
  "Content-Type": "application/json",
};

const defaultOptions = {
  baseURL: "http://localhost:3001",
  headers: headers,
};
/* When token is not found, user must be logged out or refresh token must be generated from backend.*/
const api = () => {
  const axiosInstance = axios.create(defaultOptions);

  axiosInstance.interceptors.request.use(
    async (request) => {
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
export default api();
