import { fromJS } from 'immutable';

import {
	ADD_COIN,
	WITHDRAW_COIN,
	MODAL_ADD_COIN,
	MODAL_WITHDRAW_COIN
} from './constants';

// The initial state of the App
const initialState = fromJS({
	showModal: false,
	modalType: '',
	coinType: '',
});

function walletReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_COIN:
			return state
				.set('showModal', action.show)
				.set('modalType', MODAL_ADD_COIN)
				.set('coinType', action.coinType);
		case WITHDRAW_COIN:
			return state
				.set('showModal', action.show)
				.set('modalType', MODAL_WITHDRAW_COIN)
				.set('coinType', action.coinType);
		default:
			return state;
	}
}

export default walletReducer;
