import { HasVoted } from '../../views/Vote/useVote';
import axiosInstance from '../config/Axios';

export namespace VoteService {
	export const getAllVotesDetails = () => {
		return axiosInstance.get('/vote-config');
	};

	export const getTop10 = () => {
		return axiosInstance.get('/vote/top10');
	};

	export const getAllUserVotes = (pseudo: string) => {
		return axiosInstance.get('/vote', {
			params: {
				pseudo,
			},
		});
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

	export const stockVote = (
		{ action, serveur }: HasVoted,
		pseudo: string
	) => {
		const action1 = JSON.parse(action),
			action2 = JSON.parse(action),
			inst = [];
		for (const [key, value] of Object.entries(action1) as [string, any][]) {
			if (
				value['pourcentage'] &&
				parseInt(value['pourcentage']) !== 100
			) {
				if (Math.random() * 100 > parseInt(value['pourcentage'])) {
					action2.splice(key, 1);
				}
			}
			if (value['type'] === 'jetonAlea') {
				value['type'] = 'jeton';
				value['value'] = Math.floor(
					Math.random() * (value['value2'] - value['value'] + 1) +
						value['value']
				);
				delete value['value2'];
			}
			if (value['inst'] && parseInt(value['inst']) === 1) {
				inst.push(value);
				action2.splice(key, 1);
			}
		}
		const action3 = JSON.stringify(action2);
		return axiosInstance.post(`/vote/stock`, {
			action: action3,
			pseudo,
			serveur,
		});
	};
}
