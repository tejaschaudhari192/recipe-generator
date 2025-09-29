import axios from "axios";

export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/jsonx'
    }
})

export const getServerStatus = async (): Promise<boolean> => {
    try {
        const response = await apiClient.get('/');
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false
    }
}