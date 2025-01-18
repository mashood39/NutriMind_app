import axios from "axios";

// export const baseURL = "http://10.32.1.107:4000";
export const baseURL = "http://192.168.158.9:4000";


const api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
