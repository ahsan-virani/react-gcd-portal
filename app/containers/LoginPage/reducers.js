import { fromJS } from 'immutable';

import {
  CHANGE_USERNAME,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:

      // Delete prefixed '@' from the github username
      console.log("change username reducer called");
      return state
        .set('username', action.name.replace(/@/gi, ''));
    default:
      return state;
  }
}

export default loginReducer;
