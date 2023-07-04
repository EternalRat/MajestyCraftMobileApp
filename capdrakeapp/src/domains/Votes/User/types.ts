import { ReducerType } from '../../reducer';

export interface UserVoteDetail {
	id: number;
	pseudo: string;
	nbre_votes: number;
	site: number;
	date_dernier: number;
	ip: string;
	isOld: number;
}

export enum ActionTypeUserVotes {
	GET_ALL_VOTES_DETAILS = 'getAllVotesDetails',
}

export interface getAllUserVotesDetailsPayloadAction {
	votes: UserVoteDetail[];
}

export type Action =
	| {
			type: ActionTypeUserVotes.GET_ALL_VOTES_DETAILS;
	  } & getAllUserVotesDetailsPayloadAction;

export type UserVotesReducer = ReducerType<
	ActionTypeUserVotes,
	Action,
	UserVoteDetail[]
>;
