import axios from "axios";

const BASE_URL = process.env.BASE_URL || 'http://localhost:8000'

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  timeout: 5000
})

export default instance;
