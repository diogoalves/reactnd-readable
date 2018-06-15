// import { combineReducers } from 'redux';
import {
  ORDER_BY_TIME,
  ORDER_BY_VOTES,
  UPDATE_ALL,
  SELECT_CATEGORY
} from '../actions';

export const initialState = {
  categories: [],
  posts: [],
  comments: [],
  orderBy: 'votes',
  selectedCategoryIndex: 0
};

const post = (state = { a: 1 }, action) => {
  const { type } = action;
  switch (type) {
    case ORDER_BY_TIME:
      return {
        ...state,
        orderBy: 'time'
      };

    case ORDER_BY_VOTES:
      return {
        ...state,
        orderBy: 'votes'
      };

    case UPDATE_ALL:
      return {
        ...state,
        ...action.data
      };

    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategoryIndex: action.index
      };
    default:
      return state;
  }
};

export default post;
