import { take, call, put, select, cancel, takeLatest, race, } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
// import { LOGIN_REQUEST } from './constants';
import { reposLoaded, repoLoadingError, } from 'containers/App/actions';
import { makeSelectEmail, makeSelectPassword } from 'containers/LoginPage/selectors';

import {
	SENDING_REQUEST,
	LOGIN_REQUEST,
	REGISTER_REQUEST,
	SET_AUTH,
	LOGOUT,
	REQUEST_ERROR
} from './constants';

import auth from '../../services/auth';


export function* authorize({
	username,
	password,
	isRegistering
}) {
	// We send an action that tells Redux we're sending a request
	yield put({
		type: SENDING_REQUEST,
		sending: true
	});

	// We then try to register or log in the user, depending on the request
	try {
		// let salt = genSalt(username)
		// let hash = hashSync(password, salt)
		// let response

		// For either log in or registering, we call the proper function in the `auth`
		// module, which is asynchronous. Because we're using generators, we can work
		// as if it's synchronous because we pause execution until the call is done
		// with `yield`!
		if (isRegistering) {
			response = yield call(auth.register, username, password);
		} else {
			response = yield call(auth.login, username, password);
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
			username,
			password
		} = request.data

		// A `LOGOUT` action may happen while the `authorize` effect is going on, which may
		// lead to a race condition. This is unlikely, but just in case, we call `race` which
		// returns the "winner", i.e. the one that finished first
		let winner = yield race({
			auth: call(authorize, {
				username,
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
			// yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}}) // Clear form
			forwardTo('/') // Go to dashboard page
		}
	}
}

/**
 * Github repos request/response handler
 */
export function* getRepos() {
	// Select username from store
	const username = yield select(makeSelectEmail());
	const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

	try {
		// Call our request helper (see 'utils/request')
		// const repos = yield call(request, requestURL);
		console.log('get repos called: ' + username);
		yield put(reposLoaded(username));
	} catch (err) {
		yield put(repoLoadingError(err));
	}
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
	// Watches for LOAD_REPOS actions and calls getRepos when one comes in.
	// By using `takeLatest` only the result of the latest API call is applied.
	// It returns task descriptor (just like fork) so we can continue execution
	const watcher = yield takeLatest(CHANGE_FORM, getRepos);

	// Suspend execution until location changes
	yield take(LOCATION_CHANGE);
	yield cancel(watcher);
}


function forwardTo(location) {
	browserHistory.push(location);
}

export default [loginFlow];
