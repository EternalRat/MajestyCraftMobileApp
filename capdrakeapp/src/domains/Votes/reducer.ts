import {
	Action,
	ActionTypeVotes,
	getAllVotesDetailsPayloadAction,
	VotesDetails,
	VotesReducer,
} from './types';

const configReducer: VotesReducer = {
	[ActionTypeVotes.GET_ALL_VOTES_DETAILS]: (
		_state: VotesDetails[],
		action: Action
	) => {
		return {
			...(action as getAllVotesDetailsPayloadAction).votes,
		};
	},
};

export const votesReducer = (state: VotesDetails[], action: Action) => {
	try {
		return configReducer[action.type](state, action);
	} catch (error) {
		console.error('reducer:error', error);
		return state;
	}
};
