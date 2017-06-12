import {
	ADD_COIN,
	WITHDRAW_COIN,
	COIN_LIST,
} from './constants';

export function addCoin(show, coinType) {
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

export function requestAddress(coinType) {
	return {
		type: REQUEST_ADDRESS,
		coinType,
	};
}
