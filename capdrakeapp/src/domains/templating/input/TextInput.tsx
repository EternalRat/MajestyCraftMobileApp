import NativeImage from '@chouicgames/react-native-images-to-native-images';
import { File } from '@chouicgames/react-native-images-to-native-images/src/types';
import {
	NativeSyntheticEvent,
	StyleProp,
	StyleSheet,
	TextInput,
	TextInputChangeEventData,
	TextStyle,
	View,
} from 'react-native';

import { Color, CONTAINER_WIDTH } from '../style';

interface Props {
	value: string;
	style?: StyleProp<TextStyle>;
	imageStyle?: any;
	updateText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
	icon: File;
}

export const Input = ({
	value,
	style,
	imageStyle,
	updateText,
	icon,
}: Props) => {
	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				width: '100%',
				paddingTop: 5,
			}}>
			<View
				style={{
					width: 30,
					height: 40,
					backgroundColor: Color.GREY,
					display: 'flex',
					alignItems: 'center',
				}}>
				<NativeImage
					file={icon}
					style={{
						width: 18,
						height: '100%',
						resizeMode: 'contain',
						...imageStyle,
					}}
				/>
			</View>
			<TextInput
				style={[style, styles.input]}
				value={value}
				onChange={updateText}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		fontSize: 14,
		borderColor: Color.BORDER,
		borderWidth: 1,
		width: CONTAINER_WIDTH - 30,
		height: 39.5,
		paddingLeft: 8,
		left: -1,
	},
});
