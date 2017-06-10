import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');

const makeSelectEmail = () => createSelector(
	selectLogin,
	(loginState) => loginState.get('email')
);

const makeSelectPassword = () => createSelector(
	selectLogin,
	(loginState) => loginState.get('password')
);

export {
	selectLogin,
	makeSelectEmail,
	makeSelectPassword
};
