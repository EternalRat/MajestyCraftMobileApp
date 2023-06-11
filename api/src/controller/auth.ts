import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '~/class/User.class';
import jwt from 'jsonwebtoken';
import JWT from '~/class/JWT.class';

export namespace AuthController {
	export const login = async (req: Request, res: Response) => {
		const { username, password, stayLoggedIn } = req.body;
		if (username && password) {
			let user = new User(username, password);
			if (!(await user.getUserByUsername())) {
				res.status(404).json({
					message: 'No such user found with this username',
				});
				return;
			}
			if (await compare(password, user.password as string)) {
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
					message: 'Login successful',
					data: { user: user.toJSON(), bearer: token },
				});
			} else {
				res.status(400).json({
					message: 'Password is incorrect',
				});
				return;
			}
		} else if (!password && username) {
			res.status(400).json({
				message: 'Password is required',
			});
			return;
		} else if (!username && password) {
			res.status(400).json({
				message: 'Email is required',
			});
			return;
		} else {
			res.status(400).json({
				message: 'Email and password are required',
			});
			return;
		}
	};

	export const register = (req: Request, res: Response) => {
		const { username, password, email } = req.body;
		if (username && password && email) {
			let user = new User(username, password);
			user.email = email;
			user.createUser()
				.then(user => {
					res.status(201).json({
						message: 'User created',
						data: user.toJSON(),
					});
				})
				.catch(err => {
					res.status(500).json({
						message: 'An error occured',
						data: err,
					});
				});
		} else if (!password && username && email) {
			res.status(400).json({
				message: 'Password is required',
			});
			return;
		} else if (!username && password && email) {
			res.status(400).json({
				message: 'Username is required',
			});
			return;
		} else if (!email && username && password) {
			res.status(400).json({
				message: 'Email is required',
			});
			return;
		} else {
			res.status(400).json({
				message: 'Email, username and password are required',
			});
			return;
		}
	};

	export const logout = (req: Request, res: Response) => {
		res.status(200).json({
			message: 'Logout successful',
		});
	};
}
