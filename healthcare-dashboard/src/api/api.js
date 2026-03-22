import axios from "axios";

const API = axios.create({
  baseURL: "https://healthcare-analytics-dashboard-d9sk.onrender.com/api"
});

export default API;
