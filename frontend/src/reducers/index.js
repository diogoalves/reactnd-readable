// import { combineReducers } from 'redux';
import {
  UPDATE_POST,
  UPDATE_ALL,
  SELECT_CATEGORY,
  SELECT_ORDERING
} from '../actions';

export const initialState = {
  categories: [],
  posts: [],
  comments: [],
  ordering: 0,
  selectedCategoryIndex: 0
};

const post = (state = { a: 1 }, action) => {
  const { type } = action;
  switch (type) {
    case UPDATE_ALL:
      return {
        ...state,
        ...action.data
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: { ...state.posts, ...action.data }
      };

    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategoryIndex: action.index
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
