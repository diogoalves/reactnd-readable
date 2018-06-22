import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../utils/api';
import {
  ADD_POST,
  UPDATE_POST,
  REMOVE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  // ADD_COMMENT,
  REMOVE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  FETCH_POST_DETAIL,
  updateAll
} from '../actions';

function* fetchAll() {
  const categories = yield call(Api.getAllCategories);
  const posts = yield call(Api.getAllPosts);
  yield put(updateAll({ ...categories, posts: posts }));
}

function* addPost(action) {
  const { id, timestamp, title, body, author, category } = action;
  yield call(Api.addPost, id, timestamp, title, body, author, category);
  yield call(fetchAll);
}

function* removePost(action) {
  const { id } = action;
  yield call(Api.removePost, id);
  yield call(fetchAll);
}

function* upVotePost(action) {
  const { id, post_id } = action;
  yield call(Api.upVotePost, id);
  const comments = yield call(Api.getCommentsByPostId, post_id);
  yield put(updateAll({ comments })); //todo improve to update only the selected post
}

function* downVotePost(action) {
  const { id, post_id } = action;
  yield call(Api.downVotePost, id);
  const comments = yield call(Api.getCommentsByPostId, post_id);
  yield put(updateAll({ comments })); //todo improve to update only the selected post
}

function* removeComment(action) {
  const { id, post_id } = action;
  yield call(Api.removeComment, id);
  const comments = yield call(Api.getCommentsByPostId, post_id);
  yield put(updateAll({ comments })); //todo improve to update only the selected post
}

function* upVoteComment(action) {
  const { id } = action;
  yield call(Api.upVoteComment, id);
  yield call(fetchAll);
}

function* downVoteComment(action) {
  const { id } = action;
  yield call(Api.downVoteComment, id);
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

function* fetchPostDetail({ post_id }) {
  const post = yield call(Api.getPost, post_id);
  const comments = yield call(Api.getCommentsByPostId, post_id);
  yield put(updateAll({ posts: [{ ...post }], comments })); //todo improve to update only the selected post
}

function* mySaga() {
  yield takeLatest('INIT', fetchAll);
  yield takeLatest(ADD_POST, addPost);
  yield takeLatest(REMOVE_POST, removePost);
  yield takeLatest(UPVOTE_POST, upVotePost);
  yield takeLatest(DOWNVOTE_POST, downVotePost);
  yield takeLatest(REMOVE_COMMENT, removeComment);
  yield takeLatest(UPVOTE_COMMENT, upVoteComment);
  yield takeLatest(DOWNVOTE_COMMENT, downVoteComment);
  yield takeLatest(UPDATE_POST, updatePost);
  yield takeLatest(FETCH_POST_DETAIL, fetchPostDetail);
}

export default mySaga;
