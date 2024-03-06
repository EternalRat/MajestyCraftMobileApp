export enum Routes {
	HOME = 'Home',
	AUTH = 'Auth',
	VOTE = 'Vote',
	TOPVOTE = 'TopVote',
	VOTESITE = 'VoteSite',
	VIDEOVIEW = 'VideoView',
}

export type RootStackParamList = {
	[Routes.HOME]: undefined;
	[Routes.AUTH]: undefined;
	[Routes.VOTE]: undefined;
	[Routes.TOPVOTE]: undefined;
	[Routes.VOTESITE]: {
		voteUrl: string;
	};
	[Routes.VIDEOVIEW]: undefined;
};
