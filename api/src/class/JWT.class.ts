import passportJWT from 'passport-jwt';
import { User } from './User.class';
import jwt from 'jsonwebtoken';

let JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

export default class JWT {
	public static jwtOptions = {
		secretOrKey:
			'69dec153dd693f69c368d31fca1258ede94fff02a03f796ca6dac9f35dc811af75d2d89e1f7f8416cedca20725bad055ed76d82621faad4e32ac4967a0d9edcc',
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	};

	public static jwtAuth = new JwtStrategy(JWT.jwtOptions, async function (
		jwt_payload,
		next
	) {
		console.log('payload received', jwt_payload);
		let user = new User().getUserById(jwt_payload.id);

		if (user) {
			next(null, user);
		} else {
			next(null, false);
		}
	});

	public static authToken = function authToken(
		req: any,
		res: any,
		next: any
	) {
		let bearer = req.headers['authorization'] as string;
		if (!bearer.startsWith('Bearer ')) {
			res.status(401).json({
				message: 'Incorrect token format',
			});
			return;
		}
		bearer = bearer && (bearer as string).split(' ')[1];
		if (bearer == null) {
			res.status(401).json({
				message: 'Not logged',
			});
			return;
		}
		console.log(bearer);
		jwt.verify(
			bearer,
			JWT.jwtOptions.secretOrKey,
			async (err: any, user: any) => {
				if (err) {
					res.status(403).json({
						message: 'Invalid token',
					});
					return;
				}
				req.user = user;
				if (!(await new User().getUserById(req.user.id))) {
					res.status(403).json({
						message: 'Invalid token',
					});
					return;
				}
				next();
			}
		);
	};
}
