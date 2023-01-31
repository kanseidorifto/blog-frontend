import axios from '../axios';

export const fetchLastComments = async () => {
	try {
		const { data } = await axios.get('/comments');
		return data;
	} catch (err) {}
};
