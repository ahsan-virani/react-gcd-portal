import {
  fromJS,
} from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
} from './constants';

import auth from '../../services/auth';

// The initial state of the App
const initialState = fromJS({
  currentUser: '',
  error: '',
  currentlySending: false,
  loggedIn: auth.loggedIn(),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS_SUCCESS:
      return state
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('currentUser', 'none');
    case SET_AUTH:
      return state
        .set('loggedIn', action.newAuthState);
    case SENDING_REQUEST:
      return state
        .set('currentlySending', action.sending);
    case REQUEST_ERROR:
      return state
        .set('error', action.error);
    case CLEAR_ERROR:
      return state
        .set('error', '');
    default:
      return state;
  }
}

export default appReducer;
