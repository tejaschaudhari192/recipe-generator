import axios from "axios";
import { Ingredients, Recipes } from "./types";

export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const getServerStatus = async (): Promise<boolean> => {
    try {
        const response = await apiClient.get('/status');
        // server returns { alive: true }
        return Boolean(response.data?.alive);
    } catch (error) {
        console.log(error);
        return false
    }
}

export const getRecipes = async (ingredients: Ingredients): Promise<Recipes> => {
    try {
        const response = await apiClient.post<Recipes>('/recipe', {
            ingredients
        });
        return response.data ?? [];
    } catch (error) {
        console.log(error);
        return [];
    }
}