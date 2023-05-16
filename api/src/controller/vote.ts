import { Request, Response } from 'express';

export namespace VoteController {
    export const vote = (req: Request, res: Response) => {
        res.send('vote');
    };
}
