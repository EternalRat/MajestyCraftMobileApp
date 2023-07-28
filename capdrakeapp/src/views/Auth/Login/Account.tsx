import { View } from 'react-native';

import Images from '../../../../images/Images';
import { Files } from '../../../../images/ImagesTypes';
import { Input } from '../../../domains/templating/input/TextInput';
import { Color, CONTAINER_WIDTH } from '../../../domains/templating/style';
import { Label } from '../../../domains/templating/texts/Label';
import { AuthFields } from '../useAuth';

interface Props {
	fields: AuthFields;
	setPassword: (password: string) => void;
	setUsername: (username: string) => void;
}

export const Account = ({ fields, setPassword, setUsername }: Props) => {
	return (
		<View
			style={{
				maxWidth: CONTAINER_WIDTH,
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
				<Label style={{ color: Color.WHITE }}>Pseudo</Label>
				<Input
					value={fields.username}
					updateText={e => setUsername(e.nativeEvent.text)}
					icon={Images[Files.user]}
					style={{ color: Color.WHITE }}
				/>
			</View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Label style={{ color: Color.WHITE }}>Mot de passe</Label>
				<Input
					value={fields.password}
					updateText={e => setPassword(e.nativeEvent.text)}
					icon={Images[Files.key]}
					imageStyle={{ transform: [{ rotate: '45deg' }] }}
					style={{ color: Color.WHITE }}
					type='password'
					secured
				/>
			</View>
		</View>
	);
};
