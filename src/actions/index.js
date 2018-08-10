export const REQUEST_REPOS = 'REQUEST_REPOS';
export const RECEIVE_REPOS = 'RECEIVE_REPOS';
export const SELECT_REPO = 'SELECT_REPO';
export const REQUEST_ISSUES = 'REQUEST_ISSUES';
export const RECEIVE_ISSUES = 'RECEIVE_ISSUES';

export function  requestRepos() {
  return {
    type: REQUEST_REPOS,
    isFetching: true
  }
}

export function  receiveRepos() {
  return {
    type: RECEIVE_REPOS,
    isFetching: false
  }
}