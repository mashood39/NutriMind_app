import axios from "axios";

// export const baseURL = "http://localhost:4000";
// export const baseURL = "https://nutrimindapp.vercel.app/"
export const baseURL = "https://nutrimind-76defd8rm-mashoodcks-projects.vercel.app"


const api = axios.create({
  baseURL: baseURL,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // },
});

export default api;
