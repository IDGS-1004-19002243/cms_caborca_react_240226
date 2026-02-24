import api from './config';

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Axios detectará FormData y agregará el límite (boundary) automáticamente
        const response = await api.post('/Upload', formData, {
            headers: {
                'Content-Type': undefined
            }
        });
        return response.data.url;
    } catch (error) {
        console.error("Error subiendo imagen:", error);
        throw error;
    }
};
