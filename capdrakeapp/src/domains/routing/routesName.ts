export enum Routes {
	HOME = 'Home',
	AUTH = 'Auth',
	VOTE = 'Vote',
}

export type RootStackParamList = {
	[Routes.HOME]: undefined;
	[Routes.AUTH]: undefined;
	[Routes.VOTE]: undefined;
};
