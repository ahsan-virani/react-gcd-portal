import request from '../utils/request';
// import localStorage from 'localStorage';

// let localStorage;

// If we're testing, use a local storage polyfill
// if (global.process && process.env.NODE_ENV === 'test') {
//
//   // localStorage = import ('localStorage');
// } else {
//   // If not, use the browser one
//   localStorage = global.window.localStorage;
// }
let localStorage = global.window.localStorage;

const PROD_URL = 'http://34.211.244.119:8332/';
const LOCAL_URL = 'http://10.1.18.151:4040/';

const SERVER_URL = process.env.NODE_ENV === 'production' ? PROD_URL : LOCAL_URL;


const auth = {
	/**
	 * Logs a user in, returning a promise with `true` when done
	 * @param  {string} username The username of the user
	 * @param  {string} password The password of the user
	 */
	login(username, password) {
		console.log('login(username', username, password);

		if (auth.loggedIn()) {
			console.log("auth.loggedIn");
			return Promise.resolve(true);
		}
		console.log('login(username, password) {');
		// Post a fake request
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password
			}),
		};
		return request(SERVER_URL + 'api/auth/login', options)
			.then(response => {
				// Save token to local storage
				localStorage.token = response.token;
				return Promise.resolve(true);
			})
			.catch(e => { console.log('error aa gaya bai'); return Promise.reject(e) });
	},
	/**
	 * Logs the current user out
	 */
	logout() {
		localStorage.token = '';
		return Promise.resolve(true);
	},
	/**
	 * Checks if a user is logged in
	 */
	loggedIn() {
		return !!localStorage.token;
	},
	/**
	 * Registers a user and then logs them in
	 * @param  {string} username The username of the user
	 * @param  {string} password The password of the user
	 */
	register(username, password) {

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password
			}),
		};

		// Post a fake request
		return request(SERVER_URL + 'api/users', options)
			.then(() => auth.login(username, password));
	},

	onChange() {},

	requestAddress(coinType) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'JWT ' + localStorage.token,
			},
			body: JSON.stringify({
				coinType,
				altClient: false,
			}),
		};
		return request(SERVER_URL + 'api/wallet/generateAddress', options)
			.then((response) => { return Promise.resolve(response) })
			.catch(e => { return Promise.reject(e) });
	},

	requestCoins() {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'JWT ' + localStorage.token,
			},
		};
		return request(SERVER_URL + 'api/wallet', options)
			.then((response) => { return Promise.resolve(response) })
			.catch(e => { return Promise.reject(e) });
	},

	sendCoins(amount, sendingAddress, comment = 'comment', toComment = 'to comment', altClient = false) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'JWT ' + localStorage.token,
			},
			body: JSON.stringify({
				amount,
				sendingAddress,
				comment,
				toComment,
				altClient
			}),
		};
		console.log('sendcoins request sent');
		return request(SERVER_URL + 'api/wallet/withdraw', options)
			.then((response) => { return Promise.resolve(response) })
			.catch(e => { return Promise.reject(e) });
	},

};

export default auth;
