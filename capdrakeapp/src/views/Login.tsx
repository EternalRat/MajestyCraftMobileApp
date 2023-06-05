import { Text, TextInput, View } from 'react-native';
import { Label } from '../domains/templating/texts/Label';
import { LinkButton } from '../domains/templating/buttons/Link';
import { Button } from '../domains/templating/buttons/Button';

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
						<TextInput />
					</View>
					<View>
						<Label>Mot de passe</Label>
						<TextInput />
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
