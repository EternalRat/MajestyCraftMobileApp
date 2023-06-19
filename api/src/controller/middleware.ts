import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import JWT from '~/class/JWT.class';

export namespace Middleware {
	export const auth = (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if (token == null) return res.sendStatus(401);

		jwt.verify(token, JWT.jwtOptions.secretOrKey, (err, user) => {
			if (err) return res.status(403).send('Not logged in!');
			req.user = user;
			next();
		});
	};
}
