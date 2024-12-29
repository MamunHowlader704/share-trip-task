import axios from 'axios';
export const getAllProducts = async () => {
    try {
        const url = 'https://dummyjson.com/products';
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching live contents:', error);
        throw error;
    }
};
