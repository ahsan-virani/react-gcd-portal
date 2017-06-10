import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { CHANGE_FORM } from 'containers/LoginPage/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

// import request from 'utils/request';
import { makeSelectEmail } from 'containers/LoginPage/selectors';

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

// Bootstrap sagas
export default [
	githubData,
];
