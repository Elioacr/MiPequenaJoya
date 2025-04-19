import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products'; // Asegúrate de que esta sea la URL correcta de tu backend

const api = axios.create({
    baseURL: API_URL,
});

export { API_URL };
export default api;