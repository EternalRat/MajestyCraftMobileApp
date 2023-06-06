import NativeImage from '@chouicgames/react-native-images-to-native-images';
import { useEffect } from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import Images from '../../../images/Images';
import { Files } from '../../../images/ImagesTypes';
import { Button } from '../../domains/templating/buttons/Button';
import { Color } from '../../domains/templating/style';
import { Title } from '../../domains/templating/texts/Title';
import { Account } from './Login/Account';
import { AuthViewEnum } from './useAuth';

interface Props {
	setView: (view: AuthViewEnum) => void;
}

export const Register = ({ setView }: Props) => {
	const { height } = useWindowDimensions();

	const viewOffsetY = useSharedValue(height);
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
						position: 'absolute',
						left: 16,
						top: 14,
						width: 32,
						height: 32,
						zIndex: 100,
					}}>
					<TouchableOpacity
						onPress={() => setView(AuthViewEnum.LOGIN)}>
						<View>
							<NativeImage
								file={Images[Files.back]}
								style={{
									width: 24,
									height: '100%',
									resizeMode: 'contain',
									tintColor: Color.WHITE,
								}}
							/>
						</View>
					</TouchableOpacity>
				</View>
				<View
					style={{
						height: 60,
						backgroundColor: Color.ORANGE,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Title style={{ color: Color.WHITE }}>Inscription</Title>
				</View>
				<Account />
				<View
					style={{
						width: 350,
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
						S'enregistrer
					</Button>
				</View>
			</View>
		</Animated.View>
	);
};
