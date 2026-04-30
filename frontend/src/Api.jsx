import axios from "axios";

const api = axios.create({
  baseURL: "https://nadra-kr80.onrender.com",
});

export default api;
