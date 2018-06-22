import guid from '../utils/guid';

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';

export const UPDATE_ALL = 'UPDATE_ALL';
export const SELECT_ORDERING = 'SELECT_ORDERING';

export const INIT = 'INIT';
export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL';

export const addPost = (title, body, author, category) => ({
  type: ADD_POST,
  id: guid(),
  timestamp: Date.now(),
  title,
  body,
  author,
  category
});

export const editPost = (id, title, body, author, category) => ({
  type: UPDATE_POST,
  id,
  timestamp: Date.now(),
  title,
  body,
  author,
  category
});

export const removePost = id => ({
  type: REMOVE_POST,
  id
});

export const upVotePost = id => ({
  type: UPVOTE_POST,
  id
});

export const downVotePost = id => ({
  type: DOWNVOTE_POST,
  id
});

export const addComment = (body, author, parentId) => ({
  type: ADD_COMMENT,
  id: guid(),
  timestamp: Date.now(),
  body,
  author,
  parentId
});

export const removeComment = (id, post_id) => ({
  type: REMOVE_COMMENT,
  id,
  post_id
});

export const upVoteComment = (id, post_id) => ({
  type: UPVOTE_COMMENT,
  id,
  post_id
});

export const downVoteComment = (id, post_id) => ({
  type: DOWNVOTE_COMMENT,
  id,
  post_id
});

export const updateAll = data => ({
  type: UPDATE_ALL,
  data
});

export const selectOrdering = index => ({
  type: SELECT_ORDERING,
  index
});

export const fetchPostDetails = post_id => ({
  type: FETCH_POST_DETAIL,
  post_id
});
