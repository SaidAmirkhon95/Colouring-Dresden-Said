import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL: string ="http://localhost:3003";

let clientToken: string | undefined = undefined;

export const setClientToken = (token: string | undefined): void => {
  clientToken = token;
};

const baseClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

baseClient.interceptors.request.use(
  (requestConfig: InternalAxiosRequestConfig<any>) => {
    if (clientToken) {
      requestConfig.headers.Authorization = `Bearer ${clientToken}`;
    }
    return requestConfig;
  },
  (error: any) => Promise.reject(error)
);

export default baseClient;
