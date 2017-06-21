// makeSelectLocationState expects a plain JS object for the routing state
import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectLocationState = () => {
	let prevRoutingState;
	let prevRoutingStateJS;

	return (state) => {
		const routingState = state.get('route'); // or state.route

		if (!routingState.equals(prevRoutingState)) {
			prevRoutingState = routingState;
			prevRoutingStateJS = routingState.toJS();
		}

		return prevRoutingStateJS;
	};
};

const makeSelectLoggedIn = () => createSelector(
	selectGlobal,
	(global) => global.get('loggedIn')
);

export {
	makeSelectLocationState,
	makeSelectLoggedIn
};
