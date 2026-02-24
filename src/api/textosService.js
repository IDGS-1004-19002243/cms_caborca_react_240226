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
            // Limpieza estricta: Si por alguna razón el payload contiene una imagen en Base64 (ej. guardado accidental de estado viejo)
            // lo reemplazamos por el placeholder para evitar colapsar la Base de Datos.
            const stringified = JSON.stringify(data);
            const cleanString = stringified.replace(/"data:image\/[^;]+;base64,[a-zA-Z0-9\+/=]+"/g, '"https://blocks.astratic.com/img/general-img-landscape.png"');
            const cleanData = JSON.parse(cleanString);

            const response = await api.put(`/cms/content/${pagina}`, cleanData);
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
