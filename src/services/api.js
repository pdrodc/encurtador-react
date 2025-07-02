import axios from 'axios';

const api = axios.create({
    baseURL: 'https://encurtador-url-plf9.onrender.com'
});

export default api;