// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { clearError } from 'containers/App/actions';

const errorLoading = (err) => {
	console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
	cb(null, componentModule.default);
};

// function checkAuthRoute()

function checkAuth(nextState, replace, store) {
	let loggedIn = store.getState()
		.getIn(['global', 'loggedIn']);

	store.dispatch(clearError());

	// Check if the path isn't dashboard. That way we can apply specific logic to
	// display/render the path we want to
	console.log('loggedIn', loggedIn);
	console.log('nextState', nextState);
	console.log('replace', replace);
	console.log('store', store);

	if (loggedIn && nextState.location.pathname === '/login')
		replace('/wallet');

	// if (nextState.location.pathname !== '/dashboard') {
	// 	if (loggedIn) {
	// 		if (nextState.location.state && nextState.location.pathname) {
	// 			replace(nextState.location.pathname)
	// 		} else {
	// 			replace('/')
	// 		}
	// 	}
	// } else {
	// 	// If the user is already logged in, forward them to the homepage
	// 	if (!loggedIn) {
	// 		if (nextState.location.state && nextState.location.pathname) {
	// 			replace(nextState.location.pathname)
	// 		} else {
	// 			replace('/')
	// 		}
	// 	}
	// }
}

export default function createRoutes(store) {
	// Create reusable async injectors using getAsyncInjectors factory
	const { injectReducer, injectSagas, injectSaga } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

	import ('containers/App/sagas')
	.then((saga) => {
			console.log('imported saga: ', saga);
			injectSaga(saga.default)
		})
		.catch(errorLoading);


	// import ('containers/App/Sagas')
	// .then((sagas) => { injectSagas(sagas.default) })
	// 	.catch(errorLoading);

	return [{
			onEnter: (nextState, replace) => { checkAuth(nextState, replace, store) },
			childRoutes: [{
					path: '/',
					name: 'home',
					getComponent(nextState, cb) {
						const importModules = Promise.all([
							import ('containers/HomePage'),
						]);
						const renderRoute = loadModule(cb);

						importModules.then(([component]) => {
							renderRoute(component);
						});

						importModules.catch(errorLoading);
					},
				},
				{
					path: '/Login',
					name: 'login',
					getComponent(nextState, cb) {
						const importModules = Promise.all([
							import ('containers/LoginPage/reducers'),
							import ('containers/LoginPage')
						]);
						const renderRoute = loadModule(cb);
						importModules.then(([reducer, component]) => {
							injectReducer('login', reducer.default)
							renderRoute(component);
						});

						importModules.catch(errorLoading);
						// import('containers/LoginPage')
						//   .then(loadModule(cb))
						//   .catch(errorLoading);
					}
				},
				{
					path: '/wallet',
					name: 'wallet',
					getComponent(nextState, cb) {
						const importModules = Promise.all([
							import ('containers/WalletPage/reducers'),
							import ('containers/WalletPage/sagas'),
							import ('containers/WalletPage')
						]);
						const renderRoute = loadModule(cb);
						importModules.then(([reducer, sagas, component]) => {
							injectReducer('wallet', reducer.default);
							injectSagas(sagas.default);
							renderRoute(component);
						});

						importModules.catch(errorLoading);
						// import('containers/LoginPage')
						//   .then(loadModule(cb))
						//   .catch(errorLoading);
					}
				}
			]
		},
		{
			path: '*',
			name: 'notfound',
			getComponent(nextState, cb) {
				import ('containers/NotFoundPage')
				.then(loadModule(cb))
					.catch(errorLoading);
			},
		},
	];
}
