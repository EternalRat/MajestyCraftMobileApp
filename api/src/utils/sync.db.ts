import { User, Vote, VoteConfigs, VoteReward } from '../models';

export const sync = () => {
	User.sync().then(() => {
		console.info('User table created');
	});
	Vote.sync().then(() => {
		console.info('Vote table created');
	});
	VoteConfigs.sync().then(() => {
		console.info('VoteConfigs table created');
	});
	VoteReward.sync().then(() => {
		console.info('VoteReward table created');
	});
};
