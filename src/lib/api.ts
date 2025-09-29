import axios from "axios";
import next from "next";
import { json } from "stream/consumers";

export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/jsonx'
    }
})

export const getServerStatus = async (): Promise<boolean> => {
    try {
        const response = await apiClient.get('/status');
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false
    }
}

export const getRecipes = async (ingredients:Ingredients) => {
    try {
        const response = await apiClient.post('/recipe',{
            ingredients
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}