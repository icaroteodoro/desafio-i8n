import { getRefreshToken, getToken, isTokenExpired, saveRefreshToken, saveToken } from "@/services/token-service";
import { logout } from "@/services/user-service";
import axios from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    const refreshToken = getRefreshToken();

    if(!token) return config; 

    if (isTokenExpired(token)) {
      if(isTokenExpired(refreshToken)){
        logout()
      }else{
        const response = await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          { refreshToken }
        );
  
        const { token: newToken, refreshToken: newRefreshToken } = response.data;
        saveToken(newToken);
        saveRefreshToken(newRefreshToken);
  
        config.headers.Authorization = `Bearer ${newToken}`;
        return config;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    const refreshToken = getRefreshToken();
    if(!token) return config; 

    if (isTokenExpired(token)) {
      if(isTokenExpired(refreshToken)){
        logout()
      }else{
        const response = await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          { refreshToken }
        );
  
        const { token: newToken, refreshToken: newRefreshToken } = response.data;
        saveToken(newToken);
        saveRefreshToken(newRefreshToken);
  
        config.headers.Authorization = `Bearer ${newToken}`;
        return config;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
