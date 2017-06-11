// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
	console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
	cb(null, componentModule.default);
};

export default function createRoutes(store) {
	// Create reusable async injectors using getAsyncInjectors factory
	const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

	import ('containers/App/Sagas')
	.then((sagas) => { injectSagas(sagas.default) })
		.catch(errorLoading);

	return [{
			onEnter: () => { console.log("entered new component"); },
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
							import ('containers/WalletPage')
						]);
						const renderRoute = loadModule(cb);
						importModules.then(([reducer, component]) => {
							injectReducer('wallet', reducer.default)
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
