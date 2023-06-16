import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import Images from '../../../images/Images';
import { Files } from '../../../images/ImagesTypes';
import { AuthContext } from '../../domains/auth/Context';
import { AuthStore } from '../../domains/auth/types';
import { Button } from '../../domains/templating/buttons/Button';
import { Input } from '../../domains/templating/input/TextInput';
import { Color, CONTAINER_WIDTH } from '../../domains/templating/style';
import { Label } from '../../domains/templating/texts/Label';
import { Title } from '../../domains/templating/texts/Title';
import { Back } from './components/Back';
import { AuthFields, AuthViewEnum } from './useAuth';

interface Props {
	setView: (view: AuthViewEnum) => void;
	fields: AuthFields;
	setEmail: (email: string) => void;
}

export const ForgottenPass = ({ setView, fields, setEmail }: Props) => {
	const { login } = useContext<AuthStore>(AuthContext);

	const viewOffsetY = useSharedValue(-230);
	const offsetAnimation = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: viewOffsetY.value,
				},
			],
		};
	}, [viewOffsetY]);

	useEffect(() => {
		viewOffsetY.value = withSpring(0, {
			mass: 2,
			stiffness: 120,
			damping: 40,
		});
	}, []);

	return (
		<View
			style={{
				backgroundColor: '#191919',
			}}>
			<Animated.View
				style={[
					{
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					},
					offsetAnimation,
				]}>
				<View
					style={{
						height: '100%',
						width: '100%',
						paddingBottom: 10,
					}}>
					<Back
						callback={() => {
							viewOffsetY.value = withSpring(-230, {
								mass: 2,
								stiffness: 120,
								damping: 40,
							});
							setTimeout(() => {
								setView(AuthViewEnum.LOGIN);
							}, 700);
						}}
					/>
					<View
						style={{
							height: 60,
							backgroundColor: Color.ORANGE,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Title style={{ color: Color.WHITE }}>
							Mot de passe oublié
						</Title>
					</View>
					<View
						style={{
							maxWidth: CONTAINER_WIDTH,
							display: 'flex',
							flexDirection: 'column',
							alignSelf: 'center',
							paddingTop: 16,
						}}>
						<Label style={{ color: Color.WHITE }}>Email</Label>
						<Input
							value={fields.email}
							updateText={e => setEmail(e.nativeEvent.text)}
							icon={Images[Files.email]}
							style={{ color: Color.WHITE }}
						/>
					</View>
					<View
						style={{
							width: CONTAINER_WIDTH,
							paddingTop: 16,
							display: 'flex',
							flexDirection: 'column',
							alignSelf: 'center',
						}}>
						<Button
							style={{
								width: '100%',
								backgroundColor: Color.ORANGE,
								height: 40,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onClick={() => {}}>
							Renvoyer mon mot de passe
						</Button>
					</View>
				</View>
			</Animated.View>
		</View>
	);
};
