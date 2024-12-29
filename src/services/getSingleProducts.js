import axios from 'axios';
export const getSingleProducts = async (id) => {
    try {
        const url = `https://dummyjson.com/products/${id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching live contents:', error);
        throw error;
    }
};
