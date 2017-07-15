import {
	ADD_COIN,
	WITHDRAW_COIN,
	COIN_LIST,
	COIN_LIST_RECIEVED,
	REQUEST_ADDRESS,
	ADDRESS_RECIEVED,
	CHANGE_FORM,
	SEND_COIN,
	SEND_COIN_RESPONSE,
	SEND_COIN_RESPONSE_SUCCESS
} from './constants';

export function addCoin(show, coinType, address) {
	return {
		type: ADD_COIN,
		show,
		coinType,
	};
}

export function withdrawCoin(show, coinType) {
	return {
		type: WITHDRAW_COIN,
		show,
		coinType,
	};
}

export function getCoins() {
	return {
		type: COIN_LIST,
	};
}

export function getCoinsRecieved(coins) {

	return {
		type: COIN_LIST_RECIEVED,
		coins
	};
}

export function requestAddress(coinType) {
	return {
		type: REQUEST_ADDRESS,
		coinType,
	};
}

export function addressRecieved(address, coinType) {
	return {
		type: ADDRESS_RECIEVED,
		address,
		coinType,
	};
}

export function changeForm(amount, sendingAddress) {
	return {
		type: CHANGE_FORM,
		amount,
		sendingAddress
	};
}

export function sendCoins(amount, sendingAddress, coinType) {
	return {
		type: SEND_COIN,
		amount,
		sendingAddress,
		coinType
	};
}

export function sendCoinsResponse(result) {
	return {
		type: SEND_COIN_RESPONSE,
		result
	};
}

export function sendCoinsResponseSuccess() {
	return {
		type: SEND_COIN_RESPONSE_SUCCESS
	};
}
