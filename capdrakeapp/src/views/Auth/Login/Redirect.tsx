import { View } from 'react-native';

import { LinkButton } from '../../../domains/templating/buttons/Link';
import { Color } from '../../../domains/templating/style';
import { AuthViewEnum } from '../useAuth';

interface Props {
	setView: (view: AuthViewEnum) => void;
}

export const Redirect = ({ setView }: Props) => {
	return (
		<View
			style={{
				width: 350,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignSelf: 'center',
				paddingTop: 16,
			}}>
			<View>
				<LinkButton
					style={{
						color: Color.BLACK,
					}}
					onClick={() => {
						setView(AuthViewEnum.REGISTER);
					}}>
					Créer un compte
				</LinkButton>
			</View>
			<View>
				<LinkButton
					style={{
						color: Color.BLACK,
					}}
					onClick={() => {
						setView(AuthViewEnum.FORGOTTEN_PASSWORD);
					}}>
					Mot de passe oublié ?
				</LinkButton>
			</View>
		</View>
	);
};
