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

interface Props {
	value: string;
	style?: StyleProp<TextStyle>;
	updateText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
	icon: File;
}

export const Input = ({ value, style, updateText, icon }: Props) => {
	return (
		<View>
			<NativeImage file={icon} />
			<TextInput
				style={[style, styles.label]}
				value={value}
				onChange={updateText}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		fontSize: 14,
	},
});
