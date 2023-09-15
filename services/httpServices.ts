import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "https://repair-zone.onrender.com",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requestServices = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: object) =>
    instance.post(url, body).then(responseBody),
  update: (url: string, body: object) =>
    instance.patch(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export default requestServices;
