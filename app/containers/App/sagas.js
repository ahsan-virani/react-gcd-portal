import { take, call, all, put, fork, race, } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import {
	SENDING_REQUEST,
	LOGIN_REQUEST,
	REGISTER_REQUEST,
	SET_AUTH,
	LOGOUT,
	REQUEST_ERROR
} from './constants';

import auth from '../../services/auth';

function forwardTo(location) {
	browserHistory.push(location);
}


export function* loginFlow() {
	while (true) {
		const request = yield take(LOGIN_REQUEST);
		console.log('authSaga request', request)
		let {
			email,
			password
		} = request.data;
		try {
			let response = yield call(auth.login, email, password);
			console.log('authSaga response', response) // This returns undefined!
			yield put({ type: SET_AUTH, newAuthState: true });
			forwardTo('/wallet');
		} catch (e) {
			console.log('login error: ', e);
			return yield put({ type: REQUEST_ERROR, response: e.response });
		}

	}
}



export default function* sagas() {
	yield fork(loginFlow)
}

// export default [root];
