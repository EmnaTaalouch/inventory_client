import axios from 'axios';
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    responseType: 'json',
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong'),
);

export default axiosInstance;
