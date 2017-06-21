import { fromJS } from 'immutable';

import {
	ADD_COIN,
	WITHDRAW_COIN,
	MODAL_ADD_COIN,
	MODAL_WITHDRAW_COIN,
	COIN_LIST,
	SEND_COIN,
	COIN_LIST_RECIEVED,
	ADDRESS_RECIEVED,
	CHANGE_FORM,
	SEND_COIN_RESPONSE,
	SEND_COIN_RESPONSE_SUCCESS
} from './constants';

// The initial state of the App
const initialState = fromJS({
	showModal: false,
	modalType: '',
	coinType: '',
	address: '',
	coins: [],
	amount: '',
	sendingAddress: '',
	resultResponse: false,
	resultResponseStatus: false,
	sendCoinInProgress: false,
});

// {
// 	'coinType': 'BTC'
// 		'currencyName': 'Bitcoin',
// 		'symbol': 'BTC',
// 		'availableBalance': '0.0253',
// 		'pendingDeposit': '0.001',
// 		'reserved': '0.01',
// 		'total': '0.0033',
// 		'estValue': '212',
// 		'change': '0.00',
// 	},
// 	{
// 		'currencyName': 'Etherium',
// 		'symbol': 'ETH',
// 		'availableBalance': '0.0253',
// 		'pendingDeposit': '0.001',
// 		'reserved': '0.01',
// 		'total': '0.0033',
// 		'estValue': '212',
// 		'change': '0.00',
// 	}

function walletReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_COIN:
			return state
				.set('showModal', action.show)
				.set('modalType', MODAL_ADD_COIN)
				.set('coinType', action.coinType)
				.set('address', '')
				.set('amount', 0)
				.set('sendingAddress', '');
			s
		case WITHDRAW_COIN:
			return state
				.set('showModal', action.show)
				.set('modalType', MODAL_WITHDRAW_COIN)
				.set('coinType', action.coinType);
		case COIN_LIST_RECIEVED:
			return state.set('coins', fromJS(action.coins));
			//	return state.set('coins', action.coins);
		case ADDRESS_RECIEVED:
			return state.set('address', action.address);
		case CHANGE_FORM:
			return state.set('amount', action.amount)
				.set('sendingAddress', action.sendingAddress);
		case SEND_COIN:
			return state
				.set('sendCoinInProgress', true);
		case SEND_COIN_RESPONSE:
			return state
				.set('showModal', false)
				.set('amount', 0)
				.set('sendingAddress', '')
				.set('resultResponse', true)
				.set('resultResponseStatus', action.result)
				.set('sendCoinInProgress', false);
		case SEND_COIN_RESPONSE_SUCCESS:
			return state
				.set('resultResponse', false);


		default:
			return state;
	}
}

export default walletReducer;
