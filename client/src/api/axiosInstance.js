import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://e-commerce-2e5z.onrender.com/api';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
