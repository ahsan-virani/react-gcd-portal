import { take, call, all, put, fork, race, } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import {
	REQUEST_ADDRESS,
	ADDRESS_RECIEVED,
	COIN_LIST,
	COIN_LIST_RECIEVED,
} from './constants';

import { REQUEST_ERROR } from 'containers/App/constants';

import auth from '../../services/auth';

function* requestAddress(coinType) {
	try {
		const addressResponse = yield call(auth.requestAddress, coinType);
		if (addressResponse) {
			yield put({ type: ADDRESS_RECIEVED, address: addressResponse.address, coinType: addressResponse.coinType });
		} else {
			yield put({ type: ADDRESS_RECIEVED, address: '', coinType: '' });
		}
	} catch (e) {
		console.log('address generation error: ', e);
		return yield put({ type: REQUEST_ERROR, response: e.response });
	}
	// if (addressResponse.error) {
	//
	// }

	// if (!starredByUser || !starredByUser.pageCount || loadMore)
	// 	yield call(
	// 		fetchStarred,
	// 		login,
	// 		starredByUser.nextPageUrl || firstPageStarredUrl(login)
	// 	)
}


function* getCoins() {

	console.log('coin agaye');
	// return;

	try {
		const coinListResponse = yield call(auth.requestCoins);
		if (coinListResponse) {
			yield put({ type: COIN_LIST_RECIEVED, coins: coinListResponse.coins });
		} else {
			yield put({ type: COIN_LIST_RECIEVED, coins: [] });
		}
	} catch (e) {
		console.log('coin list error: ', e);
		return yield put({ type: REQUEST_ERROR, response: e.response });
	}
	// if (addressResponse.error) {
	//
	// }

	// if (!starredByUser || !starredByUser.pageCount || loadMore)
	// 	yield call(
	// 		fetchStarred,
	// 		login,
	// 		starredByUser.nextPageUrl || firstPageStarredUrl(login)
	// 	)
}

function* watchRequestAddress() {
	while (true) {
		const { coinType } = yield take(REQUEST_ADDRESS);
		yield fork(requestAddress, coinType);
	}
}

function* watchRequestCoins() {
	while (true) {
		yield take(COIN_LIST);
		yield fork(getCoins);
	}
}

export default [watchRequestAddress, watchRequestCoins];

function forwardTo(location) {
	browserHistory.push(location);
}
