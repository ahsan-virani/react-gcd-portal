import { take, call, all, put, fork, race, cancel, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
	REQUEST_ADDRESS,
	ADDRESS_RECIEVED,
	COIN_LIST,
	COIN_LIST_RECIEVED,
	SEND_COIN,
	SEND_COIN_RESPONSE
} from './constants';

import { REQUEST_ERROR } from 'containers/App/constants';

import auth from '../../services/auth';

function* requestAddress(coinType) {
	try {
		const addressResponse = yield call(auth.requestAddress, coinType.coinType);
		if (addressResponse) {
			yield put({ type: ADDRESS_RECIEVED, address: addressResponse.address, coinType: addressResponse.coinType });
		} else {
			yield put({ type: ADDRESS_RECIEVED, address: addressResponse.address, coinType: addressResponse.coinType });
		}
	} catch (e) {
		console.log('send coin generation error: ', e);
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

}


function* sendCoins(data) {

	try {
		const sendCoinsResponse = yield call(auth.sendCoins, data.amount, data.sendingAddress);
		if (sendCoinsResponse) {

			yield put({ type: SEND_COIN_RESPONSE, result: true });
		} else {
			yield put({ type: SEND_COIN_RESPONSE, result: false });
		}
	} catch (e) {
		console.log('coin list error: ', e);
		return yield put({ type: REQUEST_ERROR, response: e.response });
	}
}

function* watchRequestAddress() {
	// while (true) {
	// 	const { coinType } = yield take(REQUEST_ADDRESS);
	// 	yield fork(requestAddress, coinType);
	//
	// }
	const watcher = yield takeLatest(REQUEST_ADDRESS, requestAddress);
	// const watcher = yield fork(getCoins);
	yield take(LOCATION_CHANGE);
	yield cancel(watcher);

}

function* watchRequestCoins() {
	console.log('watchRequestCoins');
	// while (true) {
	// 	yield take(COIN_LIST);
	// 	const watcher = yield fork(getCoins);
	// 	yield take(LOCATION_CHANGE);
	// 	yield cancel(watcher);
	// }

	const watcher = yield takeLatest(COIN_LIST, getCoins);
	// const watcher = yield fork(getCoins);
	yield take(LOCATION_CHANGE);
	yield cancel(watcher);
}

function* watchSendCoins() {
	// while (true) {
	// 	const { amount, sendingAddress } = yield take(SEND_COIN);
	// 	// const { sendingAddress } = yield take(SEND_COIN);
	// 	yield fork(sendCoins, amount, sendingAddress);
	// }

	const watcher = yield takeLatest(SEND_COIN, sendCoins);
	// const watcher = yield fork(getCoins);
	yield take(LOCATION_CHANGE);
	yield cancel(watcher);
}

export default [watchRequestAddress, watchRequestCoins, watchSendCoins];

function forwardTo(location) {
	browserHistory.push(location);
}
