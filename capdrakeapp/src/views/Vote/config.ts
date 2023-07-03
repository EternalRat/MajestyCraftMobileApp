interface LinkVote {
	base: string;
	checkVote: string;
}

export const allLinks: LinkVote[] = [
	{
		base: 'serveurs-mc.net',
		checkVote: 'https://serveurs-mc.net/api/hasVote/:id/:ip/10',
	},
	{
		base: 'serveur-minecraft-vote.fr',
		checkVote:
			'https://serveur-minecraft-vote.fr/api/v1/servers/:id/vote/:ip',
	},
	{
		base: 'serveur-prive.net',
		checkVote: 'https://serveur-prive.net/api/vote/json/:id/:ip',
	},
	{
		base: 'yserveur.fr',
		checkVote: 'https://yserveur.fr/api/vote/:id/:ip',
	},
	{
		base: 'serveurs-minecraft.org',
		checkVote:
			'https://www.serveurs-minecraft.org/api/is_valid_vote.php?id=:id&ip=:ip&duration=5',
	},
	{
		base: 'serveurs-minecraft.com',
		checkVote:
			'https://serveurs-minecraft.com/api.php?Classement=:id&ip=:ip',
	},
	{
		base: 'serveursminecraft.fr',
		checkVote:
			'https://serveursminecraft.fr/api/api.php?IDServeur=:id&IP=:ip',
	},
	{
		base: 'liste-minecraft-serveurs.com',
		checkVote:
			'https://www.liste-minecraft-serveurs.com/Api/Worker/id_server/:id/ip/:ip',
	},
	{
		base: 'liste-serveurs.fr',
		checkVote: 'https://www.liste-serveurs.fr/api/checkVote/:id/:ip',
	},
	{
		base: 'liste-serveur.fr',
		checkVote: 'https://www.liste-serveur.fr/api/hasVoted/:id/:ip',
	},
	{
		base: 'top-serveurs.net',
		checkVote:
			'https://api.top-serveurs.net/v1/votes/check-ip?server_token=:id&ip=:ip',
	},
	{
		base: 'serveursminecraft.org',
		checkVote:
			'https://www.serveursminecraft.org/sm_api/peutVoter.php?id=:id&ip=:ip',
	},
	{
		base: 'serveur-multigames.net',
		checkVote: 'https://serveur-multigames.net/api/v2/vote/json/:id/:ip',
	},
	{
		base: 'minecraft-top.com',
		checkVote: 'https://api.minecraft-top.com/v1/vote/:ip/:id',
	},
	{
		base: 'liste-serveurs-minecraft.org',
		checkVote:
			'https://api.liste-serveurs-minecraft.org/vote/vote_verification.php?server_id=:id&ip=:ip&duration=360',
	},
	{
		base: 'liste-serv-minecraft.fr',
		checkVote:
			'https://liste-serv-minecraft.fr/api/check?server=:id&ip=:ip',
	},
	{
		base: 'minecraft-mp.com',
		checkVote:
			'https://minecraft-mp.com/api/?object=votes&element=claim&key=:id&username=:username',
	},
	{
		base: 'serveur-minecraft.com',
		checkVote: 'https://serveur-minecraft.com/api/1/vote/:id/:ip',
	},
	{
		base: 'meilleurs-serveurs.com',
		checkVote:
			'https://meilleurs-serveurs.com/api/v1/server/:id//vote/check?ip_address=:ip',
	},
];
