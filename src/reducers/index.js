import {combineReducers} from 'redux';
import { REQUEST_REPOS } from '../actions';

const repos = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_REPOS:
      return {
        ...state,
        isFetching: true
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  repos
})

export default rootReducer