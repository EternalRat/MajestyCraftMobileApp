import {
	Action,
	ActionTypeUserVotes,
	getAllUserVotesDetailsPayloadAction,
	UserVoteDetail,
	UserVotesReducer,
} from './types';

const configReducer: UserVotesReducer = {
	[ActionTypeUserVotes.GET_ALL_VOTES_DETAILS]: (
		_state: UserVoteDetail[],
		action: Action
	) => {
		return (action as getAllUserVotesDetailsPayloadAction).votes;
	},
};

export const userVotesReducer = (state: UserVoteDetail[], action: Action) => {
	try {
		return configReducer[action.type](state, action);
	} catch (error) {
		console.error('reducer:error', error);
		return state;
	}
};
