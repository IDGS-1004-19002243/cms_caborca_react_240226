import api from './config';

export const textosService = {
    getTextos: async (pagina) => {
        try {
            const response = await api.get(`/cms/content/${pagina}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching textos for ${pagina}:`, error);
            throw error;
        }
    },
    updateTextos: async (pagina, data) => {
        try {
            const response = await api.put(`/cms/content/${pagina}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error updating textos for ${pagina}:`, error);
            throw error;
        }
    },
    // Publica TODO el contenido borrador a producción
    deployContent: async () => {
        try {
            const response = await api.post('/cms/deploy');
            return response.data;
        } catch (error) {
            console.error('Error deploying content:', error);
            throw error;
        }
    }
};
