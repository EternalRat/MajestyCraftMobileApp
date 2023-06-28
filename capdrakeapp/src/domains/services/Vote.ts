import axiosInstance from '../config/Axios';

export namespace VoteService {
	export const getAllVotesDetails = () => {
		return axiosInstance.get('/votes');
	};
}
