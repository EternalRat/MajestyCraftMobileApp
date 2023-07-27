import NativeImage from '@chouicgames/react-native-images-to-native-images';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TouchableOpacity, View } from 'react-native';

import Images from '../../images/Images';
import { Files } from '../../images/ImagesTypes';
import { RootStackParamList, Routes } from '../domains/routing/routesName';
import { Color } from '../domains/templating/style';

interface Props {
	navigation: DrawerNavigationProp<RootStackParamList, Routes>;
}

export const Header = ({ navigation }: Props) => {
	return (
		<View
			style={{
				height: 64,
				display: 'flex',
				justifyContent: 'space-between',
				flexDirection: 'row',
				zIndex: 1000,
				position: 'absolute',
			}}>
			<TouchableOpacity onPress={() => navigation.openDrawer()}>
				<NativeImage
					file={Images[Files.hamburger]}
					style={{
						height: 32,
						width: 32,
						resizeMode: 'contain',
						tintColor: Color.ORANGE,
						margin: 16,
					}}
				/>
			</TouchableOpacity>
		</View>
	);
};
