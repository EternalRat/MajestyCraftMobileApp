import VoteConfigModel from './classModel/VoteConfigModel.class';

interface VoteConfig {
	id: number;
	timer: number;
	link: string;
	title: string;
	idCustom: string;
}

class Vote {
	private _id: number;
	private _timer: number;
	private _link: string;
	private _title: string;
	private _idCustomer: string;

	constructor() {}

	public get id(): number {
		return this._id;
	}

	public get timer(): number {
		return this._timer;
	}

	public get link(): string {
		return this._link;
	}

	public get title(): string {
		return this._title;
	}

	public get idCustomer(): string {
		return this._idCustomer;
	}

	public set id(value: number) {
		this._id = value;
	}

	public set timer(value: number) {
		this._timer = value;
	}

	public set link(value: string) {
		this._link = value;
	}

	public set title(value: string) {
		this._title = value;
	}

	public set idCustomer(value: string) {
		this._idCustomer = value;
	}

	public static async getAllVotes(): Promise<VoteConfig[]> {
		return VoteConfigModel.getAllConfigs().then(votes => {
			return votes.map(vote => ({
				id: vote.get('id') as number,
				timer: vote.get('temps') as number,
				link: vote.get('lien') as string,
				title: vote.get('titre') as string,
				idCustom: vote.get('idCustom') as string,
			}));
		});
	}
}

export default Vote;
