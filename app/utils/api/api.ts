// api.ts
import axios, { AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface BasicDetailsResponse {
  data: any;
}

export const getBasicDetails = (
  projIdEnc: string
): Promise<BasicDetailsResponse> => {
  return api.get(`/api/project/basicDetails?projIdEnc=1234`, {
    params: {
      projIdEnc,
    },
  });
};

export default api;
