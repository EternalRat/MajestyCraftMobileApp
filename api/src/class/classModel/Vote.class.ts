import { Model, Sequelize } from 'sequelize';

import { Vote } from '~/models';

class VoteModel {
	public static async getVote(
		pseudo: string,
		site: number
	): Promise<Model<any, any> | null> {
		return Vote.findOne({
			where: {
				pseudo,
				site,
			},
		});
	}

	public static async getUserVotes(
		pseudo: string
	): Promise<Model<any, any>[]> {
		return Vote.findAll({
			where: {
				pseudo,
			},
		});
	}

	public static async updateVote(
		nbre_votes: number,
		date_dernier: number,
		pseudo: string,
		ip: string,
		site: number
	): Promise<[affectedCount: number]> {
		return Vote.update(
			{
				nbre_votes,
				date_dernier,
				ip,
			},
			{
				where: {
					pseudo,
					site,
				},
			}
		);
	}

	public static async createVote(
		pseudo: string,
		ip: string,
		site: number,
		date_dernier: number
	): Promise<Model<any, any>> {
		return Vote.create({
			pseudo,
			ip,
			site,
			date_dernier,
			nbre_votes: 1,
		});
	}

	public static async top10(): Promise<Model<any, any>[]> {
		return Vote.findAll({
			limit: 10,
			order: [['total_amount', 'DESC']],
			group: 'pseudo',
			attributes: [
				'pseudo',
				[
					Sequelize.fn('sum', Sequelize.col('nbre_votes')),
					'total_amount',
				],
			],
			benchmark: true,
		});
	}
}

export default VoteModel;
