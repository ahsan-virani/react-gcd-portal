import {
	ADD_COIN,
	WITHDRAW_COIN,
	COIN_LIST,
	COIN_LIST_RECIEVED,
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

export function getCoins() {
	return {
		type: COIN_LIST,
	};
}

export function getCoinsRecieved(coins) {
	console.log('getCoinsRecieved');
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
