import { Text, View } from 'react-native';

import Images, { Files } from '../../../images/Images';
import { Button } from '../../domains/templating/buttons/Button';
import { LinkButton } from '../../domains/templating/buttons/Link';
import { Input } from '../../domains/templating/input/TextInput';
import { Label } from '../../domains/templating/texts/Label';

export const Login = () => {
	return (
		<View style={{}}>
			<View>
				<View>
					<Text>Connexion</Text>
				</View>
				<View>
					<View>
						<Label>Pseudo</Label>
						<Input
							value={'rr'}
							updateText={e => {}}
							icon={Images[Files.user]}
						/>
					</View>
					<View>
						<Label>Mot de passe</Label>
						<Input
							value={'rr'}
							updateText={e => {}}
							icon={Images[Files.key]}
						/>
					</View>
				</View>
				<View>
					<View>
						<LinkButton onClick={() => {}}>
							Créer un compte
						</LinkButton>
					</View>
					<View>
						<LinkButton onClick={() => {}}>
							Mot de passe oublié
						</LinkButton>
					</View>
				</View>
				<View>
					<Button onClick={() => {}}>Se connecter</Button>
				</View>
			</View>
		</View>
	);
};
