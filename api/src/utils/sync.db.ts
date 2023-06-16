import { User } from '../models';

export const sync = () => {
	User.sync().then(() => {
		console.info('User table created');
	});
};
