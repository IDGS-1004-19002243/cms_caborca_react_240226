import api from './config';

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.url;
    } catch (error) {
        console.error("Error subiendo imagen:", error);
        throw error;
    }
};
