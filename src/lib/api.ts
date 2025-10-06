import axios, { isAxiosError } from 'axios';
import { Ingredients, Recipes } from '@/types';
import { configurations } from '@/lib/configuration';

export const apiClient = axios.create({
  baseURL:
    typeof window === 'undefined' //differentiate between environments of ssr/csr
      ? configurations.base_url
      : '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getServerStatus = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/status');
    // server returns { alive: true }
    return Boolean(response.data?.alive);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getRecipes = async (
  ingredients: Ingredients
): Promise<Recipes> => {
  try {
    const response = await apiClient.post<Recipes>('/recipe', {
      ingredients,
    });
    return response.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getHomePageContent = async () => {
  try {
    const response = await apiClient.get('/home');
    console.log('hitting');
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/signup', {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.data?.error) {
        return { error: error.response.data.error };
      }
    }
    return { error: 'Something went wrong. Please try again.' };
  }
};

export const getUserData = async () => {
  try {
    const response = await apiClient.get('/user');

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error('Unknown error:', error);
    }
    return null;
  }
};

export const getChatWithId = async (id: string) => {
  try {
    const response = await apiClient.post('/chat', {
      chatId: id,
    });

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error('Unknown error:', error);
    }
    return null;
  }
};
