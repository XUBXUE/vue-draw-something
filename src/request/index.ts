import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class Requset {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        return res;
      },
      (err: any) => err
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.status === 200) {
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res);
        }
      },
      (err: any) => err
    );
  }
  request(config: AxiosRequestConfig) {
    return this.instance.request(config);
  }
}
const request = new Requset({
  baseURL: "/api",
  timeout: 1000 * 60,
  // headers: { "Content-Type": "application/json" },
});
export default request.instance;
