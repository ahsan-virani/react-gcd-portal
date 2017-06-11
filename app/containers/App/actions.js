import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  CLEAR_ERROR,
} from './constants';

export function reposLoaded(username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    username,
  };
}

export function repoLoadingError(username) {
  return {
    type: LOAD_REPOS_ERROR,
    username,
  };
}

export function setAuthState(newAuthState) {
  return {
    type: SET_AUTH,
    newAuthState,
  };
}

export function sendingRequest(sending) {
  return {
    type: SENDING_REQUEST,
    sending,
  };
}

export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  };
}

/**
 * Tells the app we want to log out a user
 */
export function logout() {
  return {
    type: LOGOUT,
  };
}

export function registerRequest(data) {
  return {
    type: REGISTER_REQUEST,
    data,
  };
}

export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    error,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}
