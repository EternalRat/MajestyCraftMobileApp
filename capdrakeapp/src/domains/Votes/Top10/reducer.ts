import {
	Action,
	ActionTypeTopVotes,
	getAllUserVotesDetailsPayloadAction,
	TopVotes,
	TopVotesReducer,
} from './types';

const configReducer: TopVotesReducer = {
	[ActionTypeTopVotes.GET_ALL_VOTES_DETAILS]: (
		_state: TopVotes[],
		action: Action
	) => {
		return (action as getAllUserVotesDetailsPayloadAction).votes;
	},
};

export const topVotesReducer = (state: TopVotes[], action: Action) => {
	try {
		return configReducer[action.type](state, action);
	} catch (error) {
		console.error('reducer:error', error);
		return state;
	}
};
