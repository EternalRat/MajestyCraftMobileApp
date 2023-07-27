import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from 'react';

import { AuthContext } from '../auth/Context';
import { AuthStore } from '../auth/types';
import { MessageContext, MessageStore } from '../message/Context';
import { ActionTypeMessage } from '../message/types';
import { VoteService } from '../services/Vote';
import { votesReducer } from './reducer';
import { topVotesReducer } from './Top10/reducer';
import { ActionTypeTopVotes, TopVotes } from './Top10/types';
import { ActionTypeVotes, VotesDetails, VotesStore } from './types';
import { userVotesReducer } from './User/reducer';
import { ActionTypeUserVotes, UserVoteDetail } from './User/types';

const defaultVotes: VotesStore = {
	votesStore: [],
	userVotes: [],
	topVoteurs: [],
	refreshUserVotes: () => {},
};

export const VotesContext = createContext<VotesStore>(defaultVotes);

export const VotesWrapper = ({ children }: { children: React.ReactNode }) => {
	const [votesStore, dispatch] = useReducer(
		votesReducer,
		defaultVotes.votesStore
	);
	const [userVotes, dispatchUserVotes] = useReducer(
		userVotesReducer,
		defaultVotes.userVotes
	);
	const [topVoteurs, dispatchTopVoteurs] = useReducer(
		topVotesReducer,
		defaultVotes.topVoteurs
	);
	const { dispatch: dispatchMessage } =
		useContext<MessageStore>(MessageContext);
	const { authStore } = useContext<AuthStore>(AuthContext);

	useEffect(() => {
		VoteService.getAllVotesDetails()
			.then(result => {
				const { data } = result.data;
				const votes: VotesDetails[] = data.map((vote: any) => {
					return {
						id: parseInt(vote.id),
						serveur: vote.serveur,
						action: vote.action,
						title: vote.title,
						link: vote.link,
						timer: vote.timer,
						idCustom: vote.idCustom,
					} as VotesDetails;
				});
				dispatch({
					type: ActionTypeVotes.GET_ALL_VOTES_DETAILS,
					votes,
				});
			})
			.catch(() => {
				dispatchMessage({
					type: ActionTypeMessage.ADD_ERROR,
					code: "Récupération des liens impossible. Veuillez rédémarrer l'application.",
					duration: 3000,
				});
			});
		VoteService.getTop10()
			.then(result => {
				const { data } = result.data;
				const votes: TopVotes[] = data.map((vote: any) => {
					return {
						pseudo: vote.pseudo,
						total_amount: vote.total_amount,
					} as TopVotes;
				});
				dispatchTopVoteurs({
					type: ActionTypeTopVotes.GET_ALL_VOTES_DETAILS,
					votes,
				});
			})
			.catch(() => {
				dispatchMessage({
					type: ActionTypeMessage.ADD_ERROR,
					code: 'Récupération du leaderboard de vote impossible. Veuillez réessayer plus tard.',
					duration: 3000,
				});
			});
	}, []);

	useEffect(() => {
		if (authStore.username !== '') {
			VoteService.getAllUserVotes(authStore.username)
				.then(result => {
					const { data } = result.data;
					const votes: UserVoteDetail[] = data.map((vote: any) => {
						return {
							id: parseInt(vote.id),
							date_dernier: parseInt(vote.date_dernier),
							ip: vote.ip,
							isOld: parseInt(vote.isOld),
							nbre_votes: parseInt(vote.nbre_votes),
							pseudo: vote.pseudo,
							site: vote.site,
						} as UserVoteDetail;
					});
					dispatchUserVotes({
						type: ActionTypeUserVotes.GET_ALL_VOTES_DETAILS,
						votes,
					});
				})
				.catch(() => {
					dispatchMessage({
						type: ActionTypeMessage.ADD_ERROR,
						code: "Récupération des données utilisateurs impossibles. Veuillez rédémarrer l'application.",
						duration: 3000,
					});
				});
		}
	}, [authStore.username]);

	const refreshUserVotes = useCallback(() => {
		console.log(authStore.username);
		VoteService.getAllUserVotes(authStore.username)
			.then(result => {
				const { data } = result.data;
				const votes: UserVoteDetail[] = data.map((vote: any) => {
					return {
						id: parseInt(vote.id),
						date_dernier: parseInt(vote.date_dernier),
						ip: vote.ip,
						isOld: parseInt(vote.isOld),
						nbre_votes: parseInt(vote.nbre_votes),
						pseudo: vote.pseudo,
						site: vote.site,
					} as UserVoteDetail;
				});
				dispatchUserVotes({
					type: ActionTypeUserVotes.GET_ALL_VOTES_DETAILS,
					votes,
				});
			})
			.catch(() => {
				dispatchMessage({
					type: ActionTypeMessage.ADD_ERROR,
					code: "Récupération des données utilisateurs impossibles. Veuillez rédémarrer l'application.",
					duration: 3000,
				});
			});
	}, [authStore.username]);

	const value = useMemo(
		() => ({ votesStore, userVotes, topVoteurs, refreshUserVotes }),
		[votesStore, userVotes, topVoteurs, refreshUserVotes]
	);

	return (
		<VotesContext.Provider value={value}>{children}</VotesContext.Provider>
	);
};
