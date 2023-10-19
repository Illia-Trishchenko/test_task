import axios from "axios";

import AuthService from "./AuthService";

import { getResponseData } from "./http.config";

const http = axios.create({
  baseURL: "/api",
});

http.interceptors.response.use(getResponseData);

export { AuthService };

export default http;
