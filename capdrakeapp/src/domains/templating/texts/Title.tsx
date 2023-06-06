import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface Props {
	children: string;
	style?: StyleProp<TextStyle>;
}

export const Title = ({ children, style }: Props) => {
	return <Text style={[style, styles.label]}>{children}</Text>;
};

const styles = StyleSheet.create({
	label: {
		fontSize: 18,
		fontWeight: 'bold',
		fontStyle: 'normal',
	},
});
