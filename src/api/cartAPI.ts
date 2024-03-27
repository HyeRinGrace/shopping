import axios from 'axios';

axios.defaults.withCredentials = true;

export const CartfetchProducts = async () => {
	try {
		const response = await axios.get('/api/v1/user/cart');
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
};
