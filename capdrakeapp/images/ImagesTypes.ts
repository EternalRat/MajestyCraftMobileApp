import { File } from '@chouicgames/react-native-images-to-native-images/src/types';

export enum Files {
	key,
	user,
	back,
	email,
	majestycraft,
	hamburger,
	trophy,
}

export type FilesInfos = {
	[key: string]: File;
};
