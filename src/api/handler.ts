import axios from "axios";

import { MemoHandler, UsersHandler, Configuration } from "@/generated";

const API_URL = "http://localhost:8000";

const configuration = new Configuration({
  basePath: API_URL,
});

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
      "Content-Type": "application/json",
  },
});

export const memoHandler = new MemoHandler(configuration, '', axiosInstance);
export const usersHandler = new UsersHandler(configuration, '', axiosInstance);