import api from './config';

export const settingsService = {
    getMantenimiento: async () => {
        try {
            const response = await api.get('/Settings/Mantenimiento');
            return response.data;
        } catch (error) {
            console.error('Error fetching settings:', error);
            throw error;
        }
    },
    updateMantenimiento: async (data) => {
        try {
            const response = await api.put('/Settings/Mantenimiento', data);
            return response.data;
        } catch (error) {
            console.error('Error updating settings:', error);
            throw error;
        }
    }
};
