import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
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
