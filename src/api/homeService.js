import api from './config';

const homeService = {
    getHomeContent: async () => {
        try {
            const response = await api.get('/Home');
            return response.data;
        } catch (error) {
            console.error('Error fetching home content:', error);
            throw error;
        }
    },

    updateHomeContent: async (data) => {
        try {
            const stringified = JSON.stringify(data);
            const cleanString = stringified.replace(/"data:image\/[^;]+;base64,[a-zA-Z0-9\+/=]+"/g, '"https://blocks.astratic.com/img/general-img-landscape.png"');
            const cleanData = JSON.parse(cleanString);

            const response = await api.put('/Home', cleanData);
            return response.data;
        } catch (error) {
            console.error('Error updating home content:', error);
            throw error;
        }
    },

    // Nueva función para subir imágenes
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Nota: Axios calcula automáticamente el Boundary para multipart/form-data
            // si le pasas un FormData, pero especificar el header ayuda a ser explícitos.
            const response = await api.post('/Upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.url; // Devuelve la URL relativa (ej: /uploads/foto.jpg)
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    deployContent: async () => {
        try {
            const response = await api.post('/Home/deploy');
            return response.data;
        } catch (error) {
            console.error('Error deploying content:', error);
            throw error;
        }
    }
};

export default homeService;