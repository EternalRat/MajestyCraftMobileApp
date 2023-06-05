import { Files } from '../../../images/ImagesTypes';
import { ReducerType } from '../reducer';

export enum ActionTypeMessage {
	ADD_ERROR = 'add_error',
	ADD_GENERIC_MESSAGE = 'add_generic_message',
	CLOSE_MESSAGE = 'close_message',
}

export enum MessageType {
	SUCCESS = 'success',
	ERROR = 'error',
}

export type IconType = Files | 'loader';

export interface MessageState {
	message: string;
	type: MessageType;
	duration: number;
	iconAfter?: IconType;
	iconBefore?: IconType;
	colorStyle?: MessageType;
}

export interface AddPayloadAction {
	code: string;
	duration?: number;
	iconAfter?: Files;
	iconBefore?: Files;
}

export interface AddGenericPayloadAction {
	message: string;
	typeMessage: MessageType;
	duration?: number;
	iconAfter?: Files;
	iconBefore?: Files;
	colorStyle?: MessageType;
}

export type Action =
	| { type: ActionTypeMessage.CLOSE_MESSAGE }
	| ({ type: ActionTypeMessage.ADD_ERROR } & AddPayloadAction)
	| ({
			type: ActionTypeMessage.ADD_GENERIC_MESSAGE;
	  } & AddGenericPayloadAction);

export type ErrorReducer = ReducerType<ActionTypeMessage, Action, MessageState>;
