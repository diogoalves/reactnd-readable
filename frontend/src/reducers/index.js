// import { combineReducers } from 'redux';
import { UPDATE_ALL, SELECT_ORDERING } from '../actions';

export const initialState = {
  categories: [],
  posts: [],
  comments: [],
  ordering: 0
};

const post = (state = { a: 1 }, action) => {
  const { type } = action;
  switch (type) {
    case UPDATE_ALL:
      return {
        ...state,
        ...action.data
      };

    case SELECT_ORDERING:
      return {
        ...state,
        ordering: action.index
      };

    default:
      return state;
  }
};

export default post;
