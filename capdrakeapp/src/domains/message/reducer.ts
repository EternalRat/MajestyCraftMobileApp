import {
	Action,
	ActionTypeMessage,
	AddGenericPayloadAction,
	AddPayloadAction,
	ErrorReducer,
	MessageState,
	MessageType,
} from './types';

const configReducer: ErrorReducer = {
	[ActionTypeMessage.ADD_ERROR]: (
		state: MessageState,
		action: Action
	): MessageState => {
		return {
			message: `Code error: ${(action as AddPayloadAction).code}`,
			type: MessageType.ERROR,
			duration: (action as unknown as AddPayloadAction).duration || 0,
			iconAfter: (action as AddPayloadAction).iconAfter,
			iconBefore: (action as AddPayloadAction).iconBefore,
			colorStyle: MessageType.ERROR,
		};
	},
	[ActionTypeMessage.ADD_GENERIC_MESSAGE]: (
		state: MessageState,
		action: Action
	): MessageState => {
		return {
			message: (action as unknown as AddGenericPayloadAction).message,
			type: (action as unknown as AddGenericPayloadAction).typeMessage,
			duration:
				(action as unknown as AddGenericPayloadAction).duration || 0,
			iconBefore: (action as unknown as AddGenericPayloadAction)
				.iconBefore,
			iconAfter: (action as unknown as AddGenericPayloadAction).iconAfter,
			colorStyle: (action as unknown as AddGenericPayloadAction)
				.colorStyle,
		};
	},
	[ActionTypeMessage.CLOSE_MESSAGE]: (state: MessageState): MessageState => {
		return {
			type: state.type,
			message: '',
			duration: -1,
			iconBefore: undefined,
			iconAfter: undefined,
			colorStyle: undefined,
		};
	},
};

export const reducer = (state: MessageState, action: Action): MessageState => {
	try {
		return configReducer[action.type](state, action);
	} catch (error) {
		console.error('reducer:error', error);
		return state;
	}
};
