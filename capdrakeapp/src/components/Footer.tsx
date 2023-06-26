import { Text, View } from 'react-native';

import { Color } from '../domains/templating/style';

export const Footer = () => {
	return (
		<View
			style={{
				backgroundColor: 'black',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				paddingTop: 16,
				height: 100,
			}}>
			<Text style={{ color: Color.GREY }}>
				© 2020 - 2023 - Tous droits réservés, MajestyCraft.
			</Text>
			<Text style={{ color: Color.GREY }}>
				Cette application n'est pas affilié à Mojang.
			</Text>
			<Text
				style={{
					color: Color.GREY,
					paddingTop: 16,
					paddingBottom: 16,
				}}>
				Développé par eternaltv - V1.0.0
			</Text>
		</View>
	);
};
