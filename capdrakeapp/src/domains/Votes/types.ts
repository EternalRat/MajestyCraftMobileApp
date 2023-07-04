import { ReducerType } from '../reducer';
import { UserVoteDetail } from './User/types';

export interface VotesDetails {
	id: number;
	link: string;
	timer: number;
	title: string;
	idCustom: string;
}

export interface VotesStore {
	votesStore: VotesDetails[];
	userVotes: UserVoteDetail[];
}

export enum ActionTypeVotes {
	GET_ALL_VOTES_DETAILS = 'getAllVotesDetails',
}

export interface getAllVotesDetailsPayloadAction {
	votes: VotesDetails[];
}

export type Action =
	| {
			type: ActionTypeVotes.GET_ALL_VOTES_DETAILS;
	  } & getAllVotesDetailsPayloadAction;

export type VotesReducer = ReducerType<ActionTypeVotes, Action, VotesDetails[]>;
