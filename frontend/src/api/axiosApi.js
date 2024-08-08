import axios from 'axios';
import ROUTES from '../utils/routes.js';

const axiosApi = axios.create({
  baseURL: ROUTES.baseURL(),
  timeout: 5000,
});

// Добавление interceptor для запросов
axiosApi.interceptors.request.use(
  (config) => {
    // const data = getItemStorage();

    // if (data) {
    //   config.headers.Authorization = `Bearer ${data.token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Добавление interceptor для ответов
axiosApi.interceptors.response.use(
  (response) => {
    // Здесь можно добавить дополнительную логику обработки ответов
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
  // Здесь можно обрабатывать ошибки, например, обновлять токен при получении 401 ошибки
);

export default axiosApi;
