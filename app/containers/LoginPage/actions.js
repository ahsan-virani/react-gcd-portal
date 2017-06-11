import { CHANGE_FORM } from './constants';

export function changeForm(email, password) {
	return {
		type: CHANGE_FORM,
		email,
		password
	};
}
