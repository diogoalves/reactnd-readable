import { call, put, takeLatest } from 'redux-saga/effects';
import guid from '../utils/guid';
import Api from '../utils/api';
import {
  CATEGORIES_FETCH,
  POSTS_FETCH,
  POST_DETAIL_FETCH,
  CATEGORIES_FETCH_SUCCESSFUL,
  POSTS_FETCH_SUCCESSFUL,
  POST_DETAIL_FETCH_SUCCESSFUL,
  POST_ADD,
  POST_EDIT,
  POST_REMOVE,
  POST_UPVOTE,
  POST_DOWNVOTE,
  COMMENT_ADD,
  COMMENT_EDIT,
  COMMENT_REMOVE,
  COMMENT_UPVOTE,
  COMMENT_DOWNVOTE
} from '../actions';

function* fetchCategories() {
  try {
    const categories = yield call(Api.getAllCategories);
    const payload = { ...categories };
    yield put({ type: CATEGORIES_FETCH_SUCCESSFUL, payload });
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* fetchPosts() {
  try {
    const posts = yield call(Api.getAllPosts);
    const payload = { posts };
    yield put({ type: POSTS_FETCH_SUCCESSFUL, payload });
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* fetchPostDetail(action) {
  const post_id = action.payload.post_id;
  try {
    const post = yield call(Api.getPost, post_id);
    const comments = yield call(Api.getCommentsByPostId, post_id);
    const payload = { post, comments };
    yield put({ type: POST_DETAIL_FETCH_SUCCESSFUL, payload });
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* addPost(action) {
  try {
    const { title, body, author, category } = action.payload;
    const id = guid();
    const timestamp = Date.now();
    yield call(Api.addPost, id, timestamp, title, body, author, category);
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* editPost(action) {
  try {
    const { id, timestamp, title, body, author, category } = action.payload;
    yield call(Api.updatePost, id, timestamp, title, body, author, category);
    yield call(fetchPostDetail, { payload: { post_id: id } });
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* removePost(action) {
  try {
    const { post_id } = action.payload;
    yield call(Api.removePost, post_id);
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* upVotePost(action) {
  try {
    const { post_id } = action.payload;
    yield call(Api.upVotePost, post_id);
    yield call(fetchPostDetail, { payload: { post_id } });
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* downVotePost(action) {
  try {
    const { post_id } = action.payload;
    yield call(Api.downVotePost, post_id);
    yield call(fetchPostDetail, { payload: { post_id } });
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* addComment(action) {
  try {
    const { title, body, author, parentId } = action.payload;
    const id = guid();
    const timestamp = Date.now();
    yield call(Api.addComment, id, timestamp, title, body, author, parentId);
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* editComment(action) {
  try {
    const { id, timestamp, title, body, author, parentId } = action.payload;
    yield call(Api.updateComment, id, timestamp, title, body, author, parentId);
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* removeComment(action) {
  try {
    const { comment_id, post_id } = action.payload;
    yield call(Api.removeComment, comment_id);
    yield call(fetchPostDetail, { payload: { post_id } });
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* upVoteComment(action) {
  try {
    const { comment_id, post_id } = action.payload;
    yield call(Api.upVoteComment, comment_id);
    yield call(fetchPostDetail, { payload: { post_id } });
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* downVoteComment(action) {
  try {
    const { comment_id, post_id } = action.payload;
    yield call(Api.downVoteComment, comment_id);
    yield call(fetchPostDetail, { payload: { post_id } });
  } catch (error) {
    yield put({ type: 'ERROR', error });
  }
}

function* saga() {
  yield takeLatest(CATEGORIES_FETCH, fetchCategories);
  yield takeLatest(POSTS_FETCH, fetchPosts);
  yield takeLatest(POST_DETAIL_FETCH, fetchPostDetail);
  yield takeLatest(POST_ADD, addPost);
  yield takeLatest(POST_EDIT, editPost);
  yield takeLatest(POST_REMOVE, removePost);
  yield takeLatest(POST_UPVOTE, upVotePost);
  yield takeLatest(POST_DOWNVOTE, downVotePost);
  yield takeLatest(COMMENT_ADD, addComment);
  yield takeLatest(COMMENT_EDIT, editComment);
  yield takeLatest(COMMENT_REMOVE, removeComment);
  yield takeLatest(COMMENT_UPVOTE, upVoteComment);
  yield takeLatest(COMMENT_DOWNVOTE, downVoteComment);
}

export default saga;
