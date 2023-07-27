import { Model } from 'sequelize';

import { User } from '../../models';

class UserModel {
	public static async getUser(
		userId: string
	): Promise<Model<any, any> | null> {
		const user = await User.findOne({
			where: { id: userId },
		});
		return user;
	}

	public static async getUserByUsername(
		username: string
	): Promise<Model<any, any> | null> {
		const user = await User.findOne({
			where: { pseudo: username },
		});
		return user;
	}
}

export default UserModel;
