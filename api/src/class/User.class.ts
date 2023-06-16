import { Model } from 'sequelize';

import UserModel from './classModel/UserModel.class';

export class User {
	private _id: string;
	private _pseudo: string;
	private _password: string;
	private _email: string;

	constructor(pseudo: string = '', password: string = '') {
		this._pseudo = pseudo;
		this._password = password;
	}

	get id(): string {
		return this._id;
	}

	get pseudo(): string {
		return this._pseudo;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	set id(id: string) {
		this._id = id;
	}

	set pseudo(pseudo: string) {
		this._pseudo = pseudo;
	}

	set email(email: string) {
		this._email = email;
	}

	set password(password: string) {
		this._password = password;
	}

	public static fromJSON(json: any): User {
		const user = new User(json.pseudo, json.password);
		user.id = json.id;
		user._email = json.email;
		return user;
	}

	public toJSON(): {
		id: string;
		pseudo: string;
		password: string;
		email: string;
	} {
		return {
			id: this.id,
			pseudo: this.pseudo,
			password: this.password,
			email: this.email,
		};
	}

	public toString(): string {
		return JSON.stringify(this.toJSON());
	}

	public equals(user: User): boolean {
		return this.pseudo === user.pseudo && this.password === user.password;
	}

	public clone(): User {
		return User.fromJSON(this.toJSON());
	}

	private _fillFromModel(model: Model<any, any>): void {
		this._id = model.get('id') as string;
		this._pseudo = model.get('pseudo') as string;
		this._email = model.get('email') as string;
		this._password = model.get('password') as string;
	}

	public async getUserByUsername(): Promise<User> {
		try {
			const user = await UserModel.getUserByUsername(this._pseudo);
			if (user) {
				this._fillFromModel(user);
			}
			return this;
		} catch (error) {
			throw new Error('Error in getUserByUsername: ' + error);
		}
	}

	public async createUser(): Promise<User> {
		try {
			const user = await UserModel.createUser(
				this._pseudo,
				this._email,
				this._password
			);
			return this;
		} catch (error) {
			throw new Error('Error in createUser: ' + error);
		}
	}

	public async getUserById(id: string): Promise<User> {
		try {
			const user = await UserModel.getUser(id);
			if (user) {
				this._fillFromModel(user);
			}
			return this;
		} catch (error) {
			throw new Error('Error in getUserById: ' + error);
		}
	}

	public async updateUserPassword(newPassword: string): Promise<User> {
		try {
			const user = await UserModel.updateUserPassword(
				this._id,
				newPassword
			);
			if (user) {
				this._fillFromModel(user);
			}
			return this;
		} catch (error) {
			throw new Error('Error in updateUserPassword: ' + error);
		}
	}
}
