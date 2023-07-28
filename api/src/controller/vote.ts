import { Request, Response } from 'express';

import Vote from '../class/Vote.class';

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
		const { pseudo } = req.query;
		Vote.getUserVotes(pseudo as string).then(votes => {
			res.status(200).send({ data: votes });
		});
	};

	export const hasVote = (req: Request, res: Response) => {
		const { pseudo, site } = req.query;

		if (!pseudo || !site || parseInt(site as string) !== 0) {
			return res.status(400).send('Missing parameters');
		}

		Vote.hasVote(pseudo as string, parseInt(site as string)).then(
			hasVote => {
				res.status(200).send(hasVote);
			}
		);
	};

	export const getVote = (req: Request, res: Response) => {
		const { pseudo, site } = req.query;

		if (!pseudo || !site || parseInt(site as string) !== 0) {
			return res.status(400).send('Missing parameters');
		}

		Vote.getVote(pseudo as string, parseInt(site as string)).then(vote => {
			res.status(200).send(vote);
		});
	};

	export const stock = (req: Request, res: Response) => {
		const { action, pseudo, serveur } = req.body;

		if (!action || !pseudo || !serveur) {
			return res.status(400).send('Missing parameters');
		}

		Vote.createReward(pseudo, action, serveur).then(() => {
			res.status(200).send('Vote stocked');
		});
	};

	export const top10 = (req: Request, res: Response) => {
		Vote.top10().then(data => {
			res.status(200).send({ data });
		});
	};
}
