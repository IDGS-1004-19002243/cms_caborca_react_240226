import { API_URL } from './config';

/**
 * Servicio de Autenticación
 */
export const authService = {
    /**
     * Inicia sesión en el Backend .NET
     * @param {string} usuario 
     * @param {string} password 
     * @returns {Promise<{token: string, rol: string}>}
     */
    async login(usuario, password) {
        try {
            const response = await fetch(`${API_URL}/Auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, password }),
            });

            if (!response.ok) {
                // Intentar leer el mensaje de error del backend
                const errorText = await response.text();
                throw new Error(errorText || 'Error en el inicio de sesión');
            }

            // Devolver el JSON con el token
            return await response.json();
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        }
    },

    /**
     * Cierra sesión (elimina token)
     */
    logout() {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    },

    /**
     * Obtiene el usuario actual desde localStorage
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('adminUser');
        if (userStr) return JSON.parse(userStr);
        return null;
    },

    /**
     * Verifica si hay una sesión activa
     */
    isAuthenticated() {
        return !!localStorage.getItem('adminToken');
    },

    /**
     * Obtiene la lista de usuarios administradores (Solo SuperAdmin)
     */
    async getAdminUsers() {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/Auth/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener la lista de usuarios');
            }

            return await response.json();
        } catch (error) {
            console.error("Error en getAdminUsers:", error);
            throw error;
        }
    },

    /**
     * Cambia la contraseña (y opcionalmente la de otro usuario si eres SuperAdmin)
     */
    async changePassword(currentPassword, newPassword, targetUsername = null) {
        try {
            const token = localStorage.getItem('adminToken');
            const bodyData = { currentPassword, newPassword };
            if (targetUsername) {
                bodyData.targetUsername = targetUsername;
            }

            const response = await fetch(`${API_URL}/Auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Error al cambiar la contraseña');
            }

            return await response.json();
        } catch (error) {
            console.error("Error en changePassword:", error);
            throw error;
        }
    }
};
