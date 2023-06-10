import { View } from 'react-native';
import { SharedValue, withSpring } from 'react-native-reanimated';

import { LinkButton } from '../../../domains/templating/buttons/Link';
import { Color, CONTAINER_WIDTH } from '../../../domains/templating/style';
import { AuthViewEnum } from '../useAuth';

interface Props {
	setView: (view: AuthViewEnum) => void;
	viewOffsetY: SharedValue<number>;
}

export const Redirect = ({ setView, viewOffsetY }: Props) => {
	return (
		<View
			style={{
				width: CONTAINER_WIDTH,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignSelf: 'center',
				paddingTop: 16,
			}}>
			<View>
				<LinkButton
					style={{
						color: Color.WHITE,
					}}
					onClick={() => {
						viewOffsetY.value = withSpring(-375, {
							mass: 2,
							stiffness: 120,
							damping: 40,
						});
						setTimeout(() => {
							setView(AuthViewEnum.REGISTER);
						}, 700);
					}}>
					Créer un compte
				</LinkButton>
			</View>
			<View>
				<LinkButton
					style={{
						color: Color.WHITE,
					}}
					onClick={() => {
						viewOffsetY.value = withSpring(-400, {
							mass: 2,
							stiffness: 120,
							damping: 40,
						});
						setTimeout(() => {
							setView(AuthViewEnum.FORGOTTEN_PASSWORD);
						}, 700);
					}}>
					Mot de passe oublié ?
				</LinkButton>
			</View>
		</View>
	);
};
