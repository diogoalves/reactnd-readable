// import { combineReducers } from 'redux';
import {
  ORDER_BY_TIME,
  ORDER_BY_VOTES,
  UPDATE_ALL
} from '../actions';

const initialState = {
  categories: [],
  posts: [],
  comments: [],
  orderBy: 'votes'
}


const post = (state = initialState, action) => {
  const { type } = action;
  switch(type) {
    case ORDER_BY_TIME:
      return {
        ...state,
        orderBy: 'time'
      }

    case ORDER_BY_VOTES:
      return {
        ...state,
        orderBy: 'votes'
      }

    case UPDATE_ALL:
      return {
        ...state,
        ...action.data
      }
    
    default:
      return state;
  }
}

export default post;
