import axios from "axios"

const axiosClient = axios.create({
  baseURL: "https://full-stack-event-wus1.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosClient;  