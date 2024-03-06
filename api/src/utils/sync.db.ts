import { User, Vote, VoteConfigs, VoteReward } from '../models';

export const sync = () => {
	User.sync().then(() => {
		console.info('User table initialized');
	});
	Vote.sync().then(() => {
		console.info('Vote table initialized');
	});
	VoteConfigs.sync().then(() => {
		console.info('VoteConfigs table initialized');
	});
	VoteReward.sync().then(() => {
		console.info('VoteReward table initialized');
	});
};
