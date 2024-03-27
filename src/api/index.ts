import axios from 'axios';

axios.defaults.withCredentials = true;

export const fetchProducts = async () => {
	try {
		const response = await axios.get('/api/v1/products'); // Replace the URL with your real API endpoint
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
};
