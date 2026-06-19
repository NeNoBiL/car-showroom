import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Ошибка запроса:', error.response?.data?.message);
        return Promise.reject(error);
    }
);

export default api;