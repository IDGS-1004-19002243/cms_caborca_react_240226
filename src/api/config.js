import axios from 'axios';

// Definir la URL base de tu API .NET
export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "https://localhost:7020/api" : "https://cms-api-caborca-gkfbcdffbqfpesfg.centralus-01.azurewebsites.net/api");

// Crear instancia de Axios configurada
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adjuntar el Token JWT automáticamente
api.interceptors.request.use(
    (config) => {
        // El Login guarda el token en 'adminToken'
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
