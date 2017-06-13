import {
	ADD_COIN,
	WITHDRAW_COIN,
	COIN_LIST,
	REQUEST_ADDRESS,
	ADDRESS_RECIEVED,
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

export function getCoins(coins) {
	return {
		type: COIN_LIST,
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
