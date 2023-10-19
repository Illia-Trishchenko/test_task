import { AxiosResponse } from "axios";

export const getResponseData = (response: AxiosResponse): AxiosResponse =>
  response.data;
