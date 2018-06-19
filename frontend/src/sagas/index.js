import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../utils/api';
import {
  ADD_POST,
  UPDATE_POST,
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

function* fetchAll() {
  const categories = yield call(Api.getAllCategories);
  const posts = yield call(Api.getAllPosts);
  yield put(updateAll({ ...initialState, ...categories, posts: posts }));
}

function* addPost(action) {
  const { id, timestamp, title, body, author, category } = action;
  yield call(Api.addPost, id, timestamp, title, body, author, category);
  yield call(fetchAll);
}

function* updatePost(action) {
  const { id, timestamp, title, body, author, category } = action;
  const post = yield call(
    Api.addPost,
    id,
    timestamp,
    title,
    body,
    author,
    category
  );
  yield put(updateAll({ posts: post }));
}

function* mySaga() {
  yield takeLatest('INIT', fetchAll);
  yield takeLatest(ADD_POST, addPost);
  yield takeLatest(UPDATE_POST, updatePost);
}

export default mySaga;
