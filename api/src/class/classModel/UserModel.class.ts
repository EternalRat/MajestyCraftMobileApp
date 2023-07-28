import { Model } from 'sequelize';

import { User } from '../../models';

class UserModel {
	public static async createUser(
		username: string,
		email: string,
		password: string
	): Promise<Model<any, any> | null> {
		const newUser = await User.create({
			pseudo: username,
			email,
			mdp: password,
		});
		return newUser;
	}

	public static async updateUserPassword(
		userId: string,
		newPassword: string
	): Promise<Model<any, any> | null> {
		const userToUpdate = await User.findOne({
			where: { id: userId },
		});
		if (userToUpdate) {
			userToUpdate.set('password', newPassword);
			await userToUpdate.save();
		}
		return userToUpdate;
	}

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
