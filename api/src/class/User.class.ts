export class User {
	private _id: string;
	private _pseudo: string;
	private _password: string;
	private _email: string;

	constructor(pseudo: string, password: string) {
		this._pseudo = pseudo;
		this._password = password;
	}

	get id(): string {
		return this._id;
	}

	get pseudo(): string {
		return this._pseudo;
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

	set password(password: string) {
		this._password = password;
	}

	public static fromJSON(json: any): User {
		const user = new User(json.pseudo, json.password);
		user.id = json.id;
		return user;
	}

	public toJSON(): { id: string; pseudo: string; password: string } {
		return {
			id: this.id,
			pseudo: this.pseudo,
			password: this.password,
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
}
