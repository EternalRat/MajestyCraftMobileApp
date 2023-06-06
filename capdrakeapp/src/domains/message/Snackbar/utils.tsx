import NativeImage from '@chouicgames/react-native-images-to-native-images';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import Images from '../../../../images/Images';
import { Color, loadingColor } from '../../templating/style';
import { IconType, MessageType } from '../types';
import { ContentMode, DisplayMode } from './type';

export const configStyle: Record<DisplayMode, Record<ContentMode, any>> = {
	[DisplayMode.TEXT_COLOR]: {
		background: (color: string) => ({
			backgroundColor: Color.DOVE,
			borderColor: color,
			borderWidth: 2,
		}),
		text: (color: string) => ({
			color,
		}),
	},
	[DisplayMode.BACKGROUND_COLOR]: {
		background: (color: string) => ({
			backgroundColor: color,
		}),
		text: () => ({
			color: Color.DOVE,
		}),
	},
};

export const getColorStyle = (style?: MessageType) => {
	if (style === MessageType.ERROR) {
		return Color.CARDINAL;
	}
	if (style === MessageType.SUCCESS) {
		return Color.AMAZON;
	}
	return loadingColor;
};

export const renderIcon = (
	mode: DisplayMode,
	iconType?: IconType,
	colorStyle?: MessageType
) => {
	return iconType ? (
		iconType === 'loader' ? (
			<ActivityIndicator
				size={30}
				color={configStyle[mode].text(getColorStyle(colorStyle)).color}
			/>
		) : (
			<NativeImage
				file={Images[iconType]}
				style={[
					{
						width: 30,
						height: 30,
						resizeMode: 'contain',
						right: 7,
						tintColor: configStyle[mode].text(
							getColorStyle(colorStyle)
						).color,
					},
				]}
			/>
		)
	) : (
		<></>
	);
};
