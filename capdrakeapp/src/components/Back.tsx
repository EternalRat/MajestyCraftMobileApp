import NativeImage from '@chouicgames/react-native-images-to-native-images';
import { TouchableOpacity, View } from 'react-native';

import Images from '../../images/Images';
import { Files } from '../../images/ImagesTypes';
import { Color } from '../domains/templating/style';

interface Props {
	callback: () => void;
}

export const Back = ({ callback }: Props) => (
	<View
		style={{
			position: 'absolute',
			left: 16,
			top: 14,
			width: 32,
			height: 32,
			zIndex: 100,
		}}>
		<TouchableOpacity onPress={callback}>
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
);
