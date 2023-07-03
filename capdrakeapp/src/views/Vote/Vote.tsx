import { DrawerScreenProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { useContext } from 'react';
import { ScrollView, View } from 'react-native';

import Images from '../../../images/Images';
import { Files } from '../../../images/ImagesTypes';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { RootStackParamList, Routes } from '../../domains/routing/routesName';
import { Button } from '../../domains/templating/buttons/Button';
import { Input } from '../../domains/templating/input/TextInput';
import { Color } from '../../domains/templating/style';
import { Label } from '../../domains/templating/texts/Label';
import { VotesContext } from '../../domains/Votes/Context';
import { VotesStore } from '../../domains/Votes/types';
import { useVote } from './useVote';

type Props = DrawerScreenProps<RootStackParamList, Routes.VOTE>;

export const Vote = ({ navigation }: Props) => {
	const { votesStore } = useContext<VotesStore>(VotesContext);
	const { handleVote, username, setUsername } = useVote();

	return (
		<View style={{ backgroundColor: Color.BLACK, flex: 1 }}>
			<Header navigation={navigation} />
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<View
					style={{
						flex: 0.5,
						justifyContent: 'flex-end',
						alignSelf: 'center',
						bottom: 24,
					}}>
					<Label style={{ color: Color.WHITE }}>Pseudo</Label>
					<Input
						value={username}
						updateText={e => setUsername(e.nativeEvent.text)}
						icon={Images[Files.user]}
						style={{ color: Color.WHITE }}
					/>
				</View>
				{votesStore.length > 0 ? (
					<View
						style={{
							flex: 0.5,
							gap: 15,
							width: '70%',
							alignSelf: 'center',
						}}>
						{votesStore.map(vote => (
							<View key={vote.id}>
								<Button
									disabled={username.length === 0}
									style={{
										width: '100%',
										backgroundColor:
											username.length === 0
												? Color.BORDER
												: Color.ORANGE,
										height: 40,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										borderRadius: 5,
									}}
									onClick={handleVote(vote)}>
									{vote.title}
								</Button>
							</View>
						))}
					</View>
				) : (
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<Label
							style={{ color: Color.WHITE, textAlign: 'center' }}>
							Une erreur est survenue et aucun moyen de vote n'a
							été récupéré. Veuillez passer par le site, réessayer
							plus tard ou contacter le développeur ou les
							administrateurs.
						</Label>
					</View>
				)}
				<Footer />
			</ScrollView>
		</View>
	);
};

/*
$url = $this->lienData['lien'];
            if(strpos($url, 'serveurs-mc.net'))
            {
                $json = json_decode(self::fetch('https://serveurs-mc.net/api/hasVote/' .$id. '/' .$this->get_client_ip(). '/10'));
                return $json->hasVote == 'true';
            } else if (strpos($url, 'serveur-minecraft-vote.fr')) { // Serveur minecraft vote
                $apiUrl = 'https://serveur-minecraft-vote.fr/api/v1/servers/' . $id . '/vote/ ' . $this->get_client_ip();
                $json = json_decode(self::fetch($apiUrl));
                return $json->canVote == false;
            }else if(strpos($url, 'serveur-prive.net'))
            {
                $json = json_decode(self::fetch('https://serveur-prive.net/api/vote/json/' .$id. '/' . $this->get_client_ip()));
                return $json->status == 1;
            } else if (strpos($url, 'yserveur.fr'))
            {
                $json = json_decode(self::fetch('https://yserveur.fr/api/vote/' . $id . '/' . $this->get_client_ip()));
                return $json->vote == true;
            } else if(strpos($url, 'serveurs-minecraft.org') & !strpos($url, 'liste-serveurs-minecraft.org'))
            {
                $is_valid_vote = self::fetch('https://www.serveurs-minecraft.org/api/is_valid_vote.php?id='.$id.'&ip='. $this->get_client_ip().'&duration=5');
                return intval($is_valid_vote) > 0;
            } else if(strpos($url, 'serveurs-minecraft.com'))
            {
                $apiaddr = 'https://serveurs-minecraft.com/api.php?Classement=' . $id .'&ip=' .  $this->get_client_ip();
                $apiResult = self::fetch($apiaddr);
                if ($apiResult!==false) {
                    $apiResult = json_decode($apiResult, true);
                    $currentDate = new DateTime($apiResult['reqVote']['date']);
                    $voteDate = new DateTime($apiResult['lastVote']['date']);
                    $interval = $currentDate->diff($voteDate);
                    if ($interval->y==0 && $interval->m==0 && $interval->d<1 && !$apiResult['authorVote']) 
                    {
                        return true;
                    }
                }
                return false;
            } else if(strpos($url, 'serveursminecraft.fr'))
            {
                $data = self::fetch( 'https://serveursminecraft.fr/api/api.php?IDServeur=' . $id . '&IP=' .  $this->get_client_ip());
                if ( $data == false )
                {
                    return false;
                }
                else
                {
                    $data_decoded = json_decode($data,true);
                    if ( $data_decoded->DateVote >= $data_decoded->DateActuelle - 360 ){return true;}else{return false;}
                }
            }else if(strpos($url, 'liste-minecraft-serveurs.com'))
            {
                $api = json_decode(self::fetch('https://www.liste-minecraft-serveurs.com/Api/Worker/id_server/' .$id. '/ip/' . $this->get_client_ip()));
                if($api->result == 202){return true;}else{return false;}
            } else if(strpos($url, 'liste-serveurs.fr'))
            {
                $api = json_decode(self::fetch('https://www.liste-serveurs.fr/api/checkVote/' .$id. '/' . $this->get_client_ip()));
                if($api->success == true){return true;}else{return false;}
            }else if(strpos($url, 'liste-serveur.fr'))
            {
                $api = json_decode(self::fetch('https://www.liste-serveur.fr/api/hasVoted/' .$id. '/' . $this->get_client_ip()));
                if($api->hasVoted == true){return true;}else{return false;}
            }else if(strpos($url, 'top-serveurs.net'))  {
                $api = json_decode(self::fetch('https://api.top-serveurs.net/v1/votes/check-ip?server_token=' .$id. '&ip=' . $this->get_client_ip()));
                if($api->success == true){return true;}else{return false;}
            }else if(strpos($url, 'serveursminecraft.org'))   	{
                $api =self::fetch('https://www.serveursminecraft.org/sm_api/peutVoter.php?id=' .$id. '&ip=' . $this->get_client_ip());
                if($api == 'true'){return true;}else{return false;}
            }else if(strpos($url, 'serveur-multigames.net'))  {
                $json = json_decode(self::fetch('https://serveur-multigames.net/api/v2/vote/json/' .$id. '/' . $this->get_client_ip()));
                if($json->status == 'passed'){return true;}else{return false;}
            }else if(strpos($url, 'minecraft-top.com'))  {
                $api = json_decode(self::fetch('https://api.minecraft-top.com/v1/vote/' . $this->get_client_ip(). '/' .$id));
                if($api->vote == 1){return true;}else{return false;}
            }else if(strpos($url, 'liste-serveurs-minecraft.org'))  {
                $api = self::fetch('https://api.liste-serveurs-minecraft.org/vote/vote_verification.php?server_id=' .$id. '&ip=' .$this->get_client_ip(). '&duration=360');
                if(intval($api) == 1){return true;}else{return false;}
            }else if(strpos($url, 'liste-serv-minecraft.fr'))  {
                $api = json_decode(self::fetch('https://liste-serv-minecraft.fr/api/check?server=' .$id. '&ip=' .$this->get_client_ip()));
                if($api->status == 200) {
                    if(strtotime($api->datetime_vote_end) < time() - 360 ) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }else if(strpos($url, 'minecraft-mp.com'))  {
                $api = self::fetch('https://minecraft-mp.com/api/?object=votes&element=claim&key=' .$id. '&username=' .$this->Pseudo);
                if(intval($api) == 2 ){return true;}else{return false;}
            }else if(strpos($url, 'serveur-minecraft.com')){
                $api = self::fetch('https://serveur-minecraft.com/api/1/vote/' .$id. '/' .$this->get_client_ip());
                if(intval($api) == 0){return true;}else{return false;}
            }else if(strpos($url, 'meilleurs-serveurs.com')){
                $api = json_decode(self::fetch('https://meilleurs-serveurs.com/api/v1/server/' .$id. '/vote/check?ip_address=' .$this->get_client_ip()));
                if($api->status_code == 200){return true;}else{return false;}
            }
            else {
                return true;
            }
			*/
