import axios from 'axios';

// Definir la URL base de tu API .NET (Azure Production)
export const API_URL = "https://cms-api-caborca-gkfbcdffbqfpesfg.centralus-01.azurewebsites.net/api";

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
