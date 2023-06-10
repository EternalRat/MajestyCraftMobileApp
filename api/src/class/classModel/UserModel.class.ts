import { User } from '../../models';

class UserModel {
	public async createUser(
		username: string,
		email: string,
		password: string
	): Promise<any> {
		try {
			const newUser = await User.create({
				username,
				email,
				password,
			});
			return newUser;
		} catch (error) {
			// Handle error
		}
	}

	public async updateUserPassword(
		userId: number,
		newPassword: string
	): Promise<any> {
		try {
			const userToUpdate = await User.findOne({
				where: { id: userId },
			});
			if (userToUpdate) {
				userToUpdate.set('password', newPassword);
				await userToUpdate.save();
				return userToUpdate;
			}
		} catch (error) {
			// Handle error
		}
	}
}

export default UserModel;
