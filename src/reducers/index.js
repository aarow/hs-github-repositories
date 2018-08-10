import {combineReducers} from 'redux';
import { REQUEST_REPOS, RECEIVE_REPOS } from '../actions';

function repos(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_REPOS:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case RECEIVE_REPOS:
      return {
        ...state,
        isFetching: action.isFetching
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  repos
})

export default rootReducer