/* eslint-disable indent */
import React, { useEffect } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import {
	GestureHandlerRootView,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { Color } from '../../templating/style';
import { MessageType } from '../types';
import { DisplayMode, SnackbarDisplayMode, SnackBarProps } from './type';
import { configStyle, getColorStyle, renderIcon } from './utils';

const BASE_TOP_ERROR = -55;
const FINAL_TOP_ERROR = 56;

export const SnackBar = ({
	text,
	type,
	mode,
	isVisible,
	iconBefore,
	iconAfter,
	colorStyle,
	onPress = () => null,
}: SnackBarProps) => {
	const topValue = useSharedValue(
		mode === DisplayMode.BACKGROUND_COLOR ? BASE_TOP_ERROR : FINAL_TOP_ERROR
	);

	const snackAnimation = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: topValue.value,
				},
			],
		};
	});

	const paddingMode: SnackbarDisplayMode =
		typeof iconBefore !== 'undefined'
			? SnackbarDisplayMode.LEFT
			: typeof iconAfter !== 'undefined'
			? SnackbarDisplayMode.RIGHT
			: SnackbarDisplayMode.CENTER;

	useEffect(() => {
		if (mode !== DisplayMode.BACKGROUND_COLOR) {
			return;
		}
		if (isVisible) {
			topValue.value = withSpring(FINAL_TOP_ERROR, {
				mass: 1,
				stiffness: 320,
				damping: 40,
			});
		} else {
			if (topValue.value !== BASE_TOP_ERROR) {
				topValue.value = withSpring(BASE_TOP_ERROR, {
					mass: 1,
					stiffness: 320,
					damping: 40,
				});
			}
		}
	}, [isVisible]);

	return isVisible ? (
		<GestureHandlerRootView>
			<Animated.View style={[styles.container, snackAnimation]}>
				<TouchableOpacity
					activeOpacity={1}
					style={[
						styles.snackbar,
						type === MessageType.ERROR
							? styles.error
							: styles.success,
						configStyle[mode].background(getColorStyle(colorStyle)),
					]}
					onPress={() => {
						onPress();
					}}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							flex: 1,
						}}>
						{renderIcon(mode, iconBefore, colorStyle)}
						<Text
							style={
								[
									{
										paddingLeft:
											paddingMode ===
											SnackbarDisplayMode.LEFT
												? 5
												: 0,
										paddingRight:
											paddingMode ===
											SnackbarDisplayMode.RIGHT
												? 5
												: 0,
										flexWrap: 'wrap',
										alignSelf: 'center',
									},
									configStyle[mode].text(
										getColorStyle(colorStyle)
									),
								] as TextStyle
							}>
							{text}
						</Text>
						{renderIcon(mode, iconAfter, colorStyle)}
					</View>
				</TouchableOpacity>
			</Animated.View>
		</GestureHandlerRootView>
	) : (
		<></>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
	},
	snackbar: {
		maxWidth: 350,
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: 10,
	},
	success: {
		backgroundColor: Color.SUCCESS,
		borderRadius: 5,
		zIndex: 5,
	},
	error: {
		backgroundColor: Color.BLACK,
		borderRadius: 5,
		borderColor: Color.ERROR,
		borderWidth: 2,
		color: Color.WHITE,
		zIndex: 5,
	},
});
