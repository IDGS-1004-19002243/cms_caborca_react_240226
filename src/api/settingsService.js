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
    },
    getDeploySchedule: async () => {
        try {
            const response = await api.get('/Settings/DeploySchedule');
            return response.data;
        } catch (error) {
            console.error('Error fetching deploy schedule:', error);
            throw error;
        }
    },
    setDeploySchedule: async (dateString) => {
        try {
            const response = await api.post('/Settings/DeploySchedule', { date: dateString });
            return response.data;
        } catch (error) {
            console.error('Error setting deploy schedule:', error);
            throw error;
        }
    },
    getConfiguracionGeneral: async () => {
        try {
            const response = await api.get('/Settings/ConfiguracionGeneral');
            return response.data;
        } catch (error) {
            console.error('Error fetching general config:', error);
            throw error;
        }
    },
    updateConfiguracionGeneral: async (data) => {
        try {
            const response = await api.put('/Settings/ConfiguracionGeneral', data);
            return response.data;
        } catch (error) {
            console.error('Error updating general config:', error);
            throw error;
        }
    }
};
