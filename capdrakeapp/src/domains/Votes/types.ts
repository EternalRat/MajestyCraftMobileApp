import { ReducerType } from '../reducer';
import { TopVotes } from './Top10/types';
import { UserVoteDetail } from './User/types';

export interface VotesDetails {
	id: number;
	serveur: number;
	action: string;
	link: string;
	timer: number;
	title: string;
	idCustom: string;
}

export interface VotesStore {
	votesStore: VotesDetails[];
	userVotes: UserVoteDetail[];
	topVoteurs: TopVotes[];
	refreshUserVotes: () => void;
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
