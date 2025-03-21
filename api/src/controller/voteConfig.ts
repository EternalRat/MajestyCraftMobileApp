import { Request, Response } from 'express';

import Vote from '../class/Vote.class';

export namespace VoteConfig {
	export const voteConfig = async (req: Request, res: Response) => {
		const votesConfig = await Vote.getAllVotes();
		res.send({ data: votesConfig });
	};
}
