import axiosInstance from '../config/Axios';

export namespace VoteService {
	export const getAllVotesDetails = () => {
		return axiosInstance.get('/vote-config');
	};

	export const getAllUserVotes = () => {
		return axiosInstance.get('/vote');
	};

	export const getUserVote = (pseudo: string, site: number) => {
		return axiosInstance.get(`/vote/get`, {
			params: {
				pseudo,
				site,
			},
		});
	};

	export const hasVote = (site: number, pseudo: string) => {
		return axiosInstance.get(`/vote/has`, {
			params: {
				site,
				pseudo,
			},
		});
	};

	export const createVote = (
		site: number,
		pseudo: string,
		date: number,
		ip: string
	) => {
		return axiosInstance.post(`/vote`, {
			site,
			pseudo,
			date,
			ip,
		});
	};
}
