import { DrawerScreenProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { ScrollView, View } from 'react-native';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { RootStackParamList, Routes } from '../domains/routing/routesName';
import { Color } from '../domains/templating/style';

type Props = DrawerScreenProps<RootStackParamList, Routes.VOTE>;

export const Vote = ({ navigation }: Props) => {
	return (
		<View style={{ backgroundColor: Color.BLACK, flex: 1 }}>
			<Header navigation={navigation} />
			
			<ScrollView>
				<Footer />
			</ScrollView>
		</View>
	);
};
