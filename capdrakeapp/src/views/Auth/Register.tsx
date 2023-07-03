import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { AuthContext } from '../../domains/auth/Context';
import { AuthStore } from '../../domains/auth/types';
import { Button } from '../../domains/templating/buttons/Button';
import { Color, CONTAINER_WIDTH } from '../../domains/templating/style';
import { Title } from '../../domains/templating/texts/Title';
import { Back } from './components/Back';
import { RegisterFields } from './Login/RegisterFields';
import { AuthFields, AuthViewEnum } from './useAuth';

interface Props {
	setView: (view: AuthViewEnum) => void;
	fields: AuthFields;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	setUsername: (username: string) => void;
}

export const Register = ({
	setView,
	fields,
	setEmail,
	setPassword,
	setUsername,
}: Props) => {
	const { register } = useContext<AuthStore>(AuthContext);

	const viewOffsetY = useSharedValue(-500);
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
							viewOffsetY.value = withSpring(-500, {
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
							Inscription
						</Title>
					</View>
					<RegisterFields
						fields={fields}
						setEmail={setEmail}
						setUsername={setUsername}
						setPassword={setPassword}
					/>
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
								borderRadius: 5,
							}}
							onClick={async () => {
								await register(
									fields.username,
									fields.email,
									fields.password,
									true
								);
							}}>
							S'enregistrer
						</Button>
					</View>
				</View>
			</Animated.View>
		</View>
	);
};
