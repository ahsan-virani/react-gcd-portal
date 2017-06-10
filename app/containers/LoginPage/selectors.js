import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');

const makeSelectUsername = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('username')
);

export {
  selectLogin,
  makeSelectUsername,
};
