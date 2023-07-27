import RewardModel from './classModel/Reward.class';
import VoteModel from './classModel/Vote.class';
import VoteConfigModel from './classModel/VoteConfigModel.class';

interface VoteConfig {
	id: number;
	serveur: number;
	action: string;
	timer: number;
	link: string;
	title: string;
	idCustom: string;
}

class Vote {
	constructor() {}

	public static async getAllVotes(): Promise<VoteConfig[]> {
		return VoteConfigModel.getAllConfigs().then(votes => {
			return votes.map(vote => ({
				id: vote.get('id') as number,
				serveur: vote.get('serveur') as number,
				action: vote.get('action') as string,
				timer: vote.get('temps') as number,
				link: vote.get('lien') as string,
				title: vote.get('titre') as string,
				idCustom: vote.get('idCustom') as string,
			}));
		});
	}

	public static async getVote(pseudo: string, site: number) {
		return VoteModel.getVote(pseudo, site);
	}

	public static async getUserVotes(pseudo: string) {
		return VoteModel.getUserVotes(pseudo);
	}

	public static async hasVote(pseudo: string, site: number) {
		return VoteModel.getVote(pseudo, site).then(vote => {
			return vote !== null;
		});
	}

	public static async createVote(
		pseudo: string,
		site: number,
		date: number,
		ip: string
	) {
		return VoteModel.createVote(pseudo, ip, site, date);
	}

	public static async updateVote(
		pseudo: string,
		site: number,
		date: number,
		ip: string
	) {
		const vote = await this.getVote(pseudo, site);
		return VoteModel.updateVote(
			(vote?.get('nbre_votes') as number) + 1,
			date,
			pseudo,
			ip,
			site
		);
	}

	public static async createReward(
		pseudo: string,
		action: string,
		serveur: number
	) {
		return RewardModel.create(pseudo, action, serveur);
	}

	public static async top10() {
		return VoteModel.top10();
	}
}

export default Vote;
