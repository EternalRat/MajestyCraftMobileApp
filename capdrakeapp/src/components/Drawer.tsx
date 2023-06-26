import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { View } from 'react-native';

import { Color } from '../domains/templating/style';

export const DrawerContent = (props: DrawerContentComponentProps) => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Color.BLACK,
				zIndex: 200,
			}}>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{
					backgroundColor: Color.BLACK,
				}}>
				<View
					style={{
						flex: 1,
						paddingTop: 10,
					}}>
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
		</View>
	);
};
