interface LinkVote {
	base: string;
	checkVote: string;
	hasVoted: (data: any) => boolean;
}

export const allLinks: LinkVote[] = [
	{
		base: 'serveurs-mc.net',
		checkVote: 'https://serveurs-mc.net/api/hasVote/:id/:ip/10',
		hasVoted: (data: any) => data.hasVote === 'true',
	},
	{
		base: 'serveur-minecraft-vote.fr',
		checkVote:
			'https://serveur-minecraft-vote.fr/api/v1/servers/:id/vote/:ip',
		hasVoted: (data: any) => !data.canVote,
	},
	{
		base: 'serveur-prive.net',
		checkVote: 'https://serveur-prive.net/api/vote/json/:id/:ip',
		hasVoted: (data: any) => data.status,
	},
	{
		base: 'yserveur.fr',
		checkVote: 'https://yserveur.fr/api/vote/:id/:ip',
		hasVoted: (data: any) => data.vote,
	},
	{
		base: 'serveurs-minecraft.org',
		checkVote:
			'https://www.serveurs-minecraft.org/api/is_valid_vote.php?id=:id&ip=:ip&duration=5',
		hasVoted: (data: any) => parseInt(data) > 0,
	},
	{
		base: 'serveurs-minecraft.com',
		checkVote:
			'https://serveurs-minecraft.com/api.php?Classement=:id&ip=:ip',
		hasVoted: (data: any) => {
			if (!data) return false;
			const currentDate = new Date(data['reqVote']['date']);
			const voteDate = new Date(data['lastVote']['date']);
			const interval = currentDate.getTime() - voteDate.getTime();
			return (
				(interval == 0 || interval < 24 * 60 * 60) &&
				!data['authorVote']
			);
		},
	},
	{
		base: 'serveursminecraft.fr',
		checkVote:
			'https://serveursminecraft.fr/api/api.php?IDServeur=:id&IP=:ip',
		hasVoted: (data: any) => {
			if (data === false) return false;
			return data.DateVote >= data.DateActuelle - 360;
		},
	},
	{
		base: 'liste-minecraft-serveurs.com',
		checkVote:
			'https://www.liste-minecraft-serveurs.com/Api/Worker/id_server/:id/ip/:ip',
		hasVoted: (data: any) => data.result === 202,
	},
	{
		base: 'liste-serveurs.fr',
		checkVote: 'https://www.liste-serveurs.fr/api/checkVote/:id/:ip',
		hasVoted: (data: any) => data.success,
	},
	{
		base: 'liste-serveur.fr',
		checkVote: 'https://www.liste-serveur.fr/api/hasVoted/:id/:ip',
		hasVoted: (data: any) => data.hasVoted,
	},
	{
		base: 'top-serveurs.net',
		checkVote:
			'https://api.top-serveurs.net/v1/votes/check-ip?server_token=:id&ip=:ip',
		hasVoted: (data: any) => data.success,
	},
	{
		base: 'serveursminecraft.org',
		checkVote:
			'https://www.serveursminecraft.org/sm_api/peutVoter.php?id=:id&ip=:ip',
		hasVoted: (data: any) => data,
	},
	{
		base: 'serveur-multigames.net',
		checkVote: 'https://serveur-multigames.net/api/v2/vote/json/:id/:ip',
		hasVoted: (data: any) => data.status === 'passed',
	},
	{
		base: 'minecraft-top.com',
		checkVote: 'https://api.minecraft-top.com/v1/vote/:ip/:id',
		hasVoted: (data: any) => data.vote,
	},
	{
		base: 'liste-serveurs-minecraft.org',
		checkVote:
			'https://api.liste-serveurs-minecraft.org/vote/vote_verification.php?server_id=:id&ip=:ip&duration=360',
		hasVoted: (data: any) => parseInt(data) === 1,
	},
	{
		base: 'liste-serv-minecraft.fr',
		checkVote:
			'https://liste-serv-minecraft.fr/api/check?server=:id&ip=:ip',
		hasVoted: (data: any) => {
			if (data.status == 200) {
				if (
					new Date(data.datetime_vote_end).getTime() <
					new Date(Date.now() - 360).getTime()
				) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
	},
	{
		base: 'minecraft-mp.com',
		checkVote:
			'https://minecraft-mp.com/api/?object=votes&element=claim&key=:id&username=:username',
		hasVoted: (data: any) => parseInt(data) === 2,
	},
	{
		base: 'serveur-minecraft.com',
		checkVote: 'https://serveur-minecraft.com/api/1/vote/:id/:ip',
		hasVoted: (data: any) => parseInt(data) > 0,
	},
	{
		base: 'meilleurs-serveurs.com',
		checkVote:
			'https://meilleurs-serveurs.com/api/v1/server/:id//vote/check?ip_address=:ip',
		hasVoted: (data: any) => data.status_code === 200,
	},
];
