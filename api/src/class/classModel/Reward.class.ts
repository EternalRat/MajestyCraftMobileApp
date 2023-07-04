import { Model } from 'sequelize';

import { VoteReward } from '~/models';

class RewardModel {
	public static async create(
		pseudo: string,
		action: string,
		serveur: number
	): Promise<Model<any, any>> {
		return VoteReward.create({
			pseudo,
			action,
			serveur,
		});
	}
}
