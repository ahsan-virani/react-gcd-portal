import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  currentUser: '',
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS_SUCCESS:
      return state
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('currentUser', 'none');
    default:
      return state;
  }
}

export default appReducer;
