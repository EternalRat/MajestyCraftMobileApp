import { Model } from 'sequelize';

import { VoteConfigs } from '~/models/Vote';

class VoteConfigModel {
	public static async getAllConfigs(): Promise<Model<any, any>[]> {
		const votes = await VoteConfigs.findAll();
		return votes;
	}
}

export default VoteConfigModel;
