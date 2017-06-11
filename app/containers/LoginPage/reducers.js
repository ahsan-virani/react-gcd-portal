import { fromJS } from 'immutable';

import {
	CHANGE_FORM,
} from './constants';

// The initial state of the App
const initialState = fromJS({
	email: '',
	password: '',
});

function loginReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_FORM:

			// Delete prefixed '@' from the github username
			console.log("change username reducer called");
			return state
				.set('email', action.email)
				.set('password', action.password);
		default:
			return state;
	}
}

export default loginReducer;
