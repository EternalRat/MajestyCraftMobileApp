import { View } from 'react-native';

import Images from '../../../../images/Images';
import { Files } from '../../../../images/ImagesTypes';
import { Input } from '../../../domains/templating/input/TextInput';
import { Color } from '../../../domains/templating/style';
import { Label } from '../../../domains/templating/texts/Label';

export const Account = () => {
	return (
		<View
			style={{
				maxWidth: 350,
				display: 'flex',
				flexDirection: 'column',
				alignSelf: 'center',
				paddingTop: 16,
				gap: 16,
			}}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Label style={{ color: Color.BLACK }}>Pseudo</Label>
				<Input
					value={'rr'}
					updateText={e => {}}
					icon={Images[Files.user]}
					style={{ color: Color.BLACK }}
				/>
			</View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Label style={{ color: Color.BLACK }}>Mot de passe</Label>
				<Input
					value={'rr'}
					updateText={e => {}}
					icon={Images[Files.key]}
					imageStyle={{ transform: [{ rotate: '45deg' }] }}
					style={{ color: Color.BLACK }}
				/>
			</View>
		</View>
	);
};
