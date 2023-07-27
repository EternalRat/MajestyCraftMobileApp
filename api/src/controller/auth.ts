import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as Password from 'node-php-password';

import JWT from '../class/JWT.class';
import { User } from '../class/User.class';

export namespace AuthController {
	export const login = async (req: Request, res: Response) => {
		const { username, password, stayLoggedIn } = req.body;
		if (username && password) {
			let user = new User(username, password);
			if (!(await user.getUserByUsername())) {
				res.status(404).json({
					message:
						'Aucun utilisateur na été trouvé avec cet username',
				});
				return;
			}
			if (Password.verify(password, user.password as string)) {
				let token = jwt.sign(
					{
						id: user.id,
						username: user.pseudo,
						email: user.email,
					},
					JWT.jwtOptions.secretOrKey,
					{
						expiresIn: stayLoggedIn ? '7d' : '6h',
					}
				);
				res.status(200).json({
					message: 'Vous êtes connectés !',
					data: {
						user: user.toJSON(),
						bearer: token,
						ip:
							req.headers['x-forwarded-for'] ||
							req.socket.remoteAddress,
					},
				});
			} else {
				res.status(400).json({
					message: 'Le mot de passe est invalide',
				});
				return;
			}
		} else if (!password && username) {
			res.status(400).json({
				message: 'Le mot de passe est requis',
			});
			return;
		} else if (!username && password) {
			res.status(400).json({
				message: "L'username est requis",
			});
			return;
		} else {
			res.status(400).json({
				message: 'Veuillez renseigner un username et un mot de passe',
			});
			return;
		}
	};

	export const logout = (req: Request, res: Response) => {
		res.status(200).json({
			message: 'Logout successful',
		});
	};

	export const health = (req: Request, res: Response) => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if (token == null) return res.sendStatus(401);
		const verify = jwt.verify(token, JWT.jwtOptions.secretOrKey);
		if (!verify) return res.sendStatus(403);

		res.send({
			message: 'You are logged in',
			data: {
				username: (req.user as any).username,
				ip: req.socket.remoteAddress,
			},
		});
	};
}
