import { Request, Response } from 'express';

import Vote from '~/class/Vote.class';

export namespace VoteController {
	export const vote = (req: Request, res: Response) => {
		const { pseudo, site, date, ip } = req.body;

		if (!pseudo || !site || !date || !ip) {
			return res.status(400).send('Missing parameters');
		}

		Vote.hasVote(pseudo, site).then(async hasVote => {
			if (hasVote) {
				await Vote.updateVote(pseudo, site, date, ip);
			} else {
				await Vote.createVote(pseudo, site, date, ip);
			}

			res.status(200).send('Vote added');
		});
	};

	export const votes = (req: Request, res: Response) => {
		Vote.getAllVotes().then(votes => {
			res.status(200).send(votes);
		});
	};

	export const hasVote = (req: Request, res: Response) => {
		const { pseudo, site } = req.params;

		if (!pseudo || !site || parseInt(site) !== 0) {
			return res.status(400).send('Missing parameters');
		}

		Vote.hasVote(pseudo, parseInt(site)).then(hasVote => {
			res.status(200).send(hasVote);
		});
	};

	export const getVote = (req: Request, res: Response) => {
		const { pseudo, site } = req.params;

		if (!pseudo || !site || parseInt(site) !== 0) {
			return res.status(400).send('Missing parameters');
		}

		Vote.getVote(pseudo, parseInt(site)).then(vote => {
			res.status(200).send(vote);
		});
	};
}
