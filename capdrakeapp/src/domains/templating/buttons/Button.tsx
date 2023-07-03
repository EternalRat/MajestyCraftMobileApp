import { View } from 'react-native';
import {
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
} from 'react-native';

import { Color } from '../style';

interface Props {
	children: string;
	style?: StyleProp<TextStyle>;
	disabled?: boolean;
	onClick: () => void;
}

export const Button = ({
	children,
	style,
	onClick,
	disabled = false,
}: Props) => {
	return (
		<TouchableOpacity onPress={onClick} disabled={disabled}>
			<View style={[style]}>
				<Text style={[styles.label]}>{children}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		color: Color.WHITE,
	},
});
