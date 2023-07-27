import { ReducerType } from '../../reducer';

export interface TopVotes {
	pseudo: string;
	total_amount: number;
}

export enum ActionTypeTopVotes {
	GET_ALL_VOTES_DETAILS = 'getAllVotesDetails',
}

export interface getAllUserVotesDetailsPayloadAction {
	votes: TopVotes[];
}

export type Action =
	| {
			type: ActionTypeTopVotes.GET_ALL_VOTES_DETAILS;
	  } & getAllUserVotesDetailsPayloadAction;

export type TopVotesReducer = ReducerType<
	ActionTypeTopVotes,
	Action,
	TopVotes[]
>;
