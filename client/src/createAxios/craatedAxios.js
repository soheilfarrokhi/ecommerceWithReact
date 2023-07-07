import axios from "axios";

export const createdAxios = axios.create({
  baseURL: "http://localhost:1337/",
});
