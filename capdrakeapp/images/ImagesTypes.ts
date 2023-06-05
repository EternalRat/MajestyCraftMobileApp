import { File } from '@chouicgames/react-native-images-to-native-images/src/types';

export enum Files {
	// NAMES OF YOUR IMAGES HERE

	// Follow this example :

	key,
	user,
}

export type FilesInfos = {
	[key: string]: File;
};
