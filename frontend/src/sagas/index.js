import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../utils/api';
import {
  // ADD_POST,
  // REMOVE_POST,
  // UPVOTE_POST,
  // DOWNVOTE_POST,
  // ADD_COMMENT,
  // REMOVE_COMMENT,
  // UPVOTE_COMMENT,
  // DOWNVOTE_COMMENT,
  updateAll
} from '../actions';
import { initialState } from '../reducers';

function* fetchAll(action) {
  const categories = yield call(Api.getAllCategories);
  const posts = yield call(Api.getAllPosts);
  yield put(updateAll({ ...initialState, ...categories, posts: posts }));
}

function* mySaga() {
  yield takeLatest('INIT', fetchAll);
}

export default mySaga;
