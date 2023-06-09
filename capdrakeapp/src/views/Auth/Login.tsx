import { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { Button } from '../../domains/templating/buttons/Button';
import { Color, CONTAINER_WIDTH } from '../../domains/templating/style';
import { Title } from '../../domains/templating/texts/Title';
import { Account } from './Login/Account';
import { Redirect } from './Login/Redirect';
import { AuthViewEnum } from './useAuth';

interface Props {
	setView: (view: AuthViewEnum) => void;
}

export const Login = ({ setView }: Props) => {
	const [test, setTest] = useState(false);
	const { height } = useWindowDimensions();

	const viewOffsetY = useSharedValue(-400);
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
		<Animated.View
			style={[
				{
					backgroundColor: '#fff',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				},
				offsetAnimation,
			]}>
			<View
				style={{
					backgroundColor: Color.WHITE,
					height: '100%',
					width: '100%',
					paddingBottom: 10,
				}}>
				<View
					style={{
						height: 60,
						backgroundColor: Color.ORANGE,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Title style={{ color: Color.WHITE }}>Connexion</Title>
				</View>
				<Account />
				<Redirect
					setView={setView}
					viewOffsetY={viewOffsetY}
					height={height}
				/>
				<View
					style={{
						width: CONTAINER_WIDTH,
						display: 'flex',
						flexDirection: 'column',
						alignSelf: 'center',
						paddingTop: 16,
					}}>
					<BouncyCheckbox
						isChecked={test}
						text='Se souvenir de moi'
						onPress={() => {
							setTest(!test);
						}}
						fillColor={Color.ORANGE}
						disableText={false}
						disableBuiltInState
						textStyle={{
							color: Color.BLACK,
							fontSize: 14,
							textDecorationLine: 'none',
						}}
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
						Se connecter
					</Button>
				</View>
			</View>
		</Animated.View>
	);
};
