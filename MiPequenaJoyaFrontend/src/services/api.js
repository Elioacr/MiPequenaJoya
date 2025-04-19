import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

const api = axios.create({
    baseURL: API_URL,
});

export { API_URL };
export default api;