import { take, call, put, select, cancel, takeLatest, race, } from 'redux-saga/effects';
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


export function* authorize({ email, password, isRegistering }) {

	yield put({
		type: SENDING_REQUEST,
		sending: true
	});

	try {
		if (isRegistering) {
			response = yield call(auth.register, email, password);
		} else {
			response = yield call(auth.login, email, password);
		}
		console.log('response:');
		console.log('response: ', response);
		return response;
	} catch (error) {
		console.log('hi');
		console.log(error);
		// If we get an error we send Redux the appropiate action and return
		yield put({
			type: REQUEST_ERROR,
			error: error.message
		})

		return false
	} finally {
		// When done, we tell Redux we're not in the middle of a request any more
		yield put({
			type: SENDING_REQUEST,
			sending: false
		})
	}
}

export function* loginFlow() {
	// Because sagas are generators, doing `while (true)` doesn't block our program
	// Basically here we say "this saga is always listening for actions"
	while (true) {
		// And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
		let request = yield take(LOGIN_REQUEST)
		let {
			email,
			password
		} = request.data

		// A `LOGOUT` action may happen while the `authorize` effect is going on, which may
		// lead to a race condition. This is unlikely, but just in case, we call `race` which
		// returns the "winner", i.e. the one that finished first
		let winner = yield race({
			auth: call(authorize, {
				email,
				password,
				isRegistering: false
			}),
			logout: take(LOGOUT)
		})

		// If `authorize` was the winner...
		if (winner.auth) {
			// ...we send Redux appropiate actions
			yield put({
				type: SET_AUTH,
				newAuthState: true
			}) // User is logged in (authorized)
			// yield put({type: CHANGE_FORM, newFormState: {email: '', password: ''}}) // Clear form
			forwardTo('/') // Go to dashboard page
		}
	}
}

function forwardTo(location) {
	browserHistory.push(location);
}

export default [loginFlow];
