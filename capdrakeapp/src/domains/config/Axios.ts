import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.API_URL,
	timeout: 2500,
});

export default axiosInstance;
