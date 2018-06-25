export const POST_ADD = 'POST_ADD';
export const POST_EDIT = 'POST_EDIT';
export const POST_REMOVE = 'POST_REMOVE';
export const POST_UPVOTE = 'POST_UPVOTE';
export const POST_DOWNVOTE = 'POST_DOWNVOTE';
export const COMMENT_ADD = 'COMMENT_ADD';
export const COMMENT_EDIT = 'COMMENT_EDIT';
export const COMMENT_REMOVE = 'COMMENT_REMOVE';
export const COMMENT_UPVOTE = 'COMMENT_UPVOTE';
export const COMMENT_DOWNVOTE = 'COMMENT_DOWNVOTE';
export const POSTS_AND_CATEGORIES_FETCH = 'POSTS_AND_CATEGORIES_FETCH';
export const POST_DETAIL_FETCH = 'POST_DETAIL_FETCH';

export const POSTS_AND_CATEGORIES_FETCH_SUCCESSFUL =
  'POSTS_AND_CATEGORIES_FETCH_SUCCESSFUL';
export const POST_DETAIL_FETCH_SUCCESSFUL = 'POST_DETAIL_FETCH_SUCCESSFUL';

const createAction = type => payload => ({ type, payload });

export default {
  addPost: createAction(POST_ADD),
  editPost: createAction(POST_EDIT),
  removePost: createAction(POST_REMOVE),
  upVotePost: createAction(POST_UPVOTE),
  downVotePost: createAction(POST_DOWNVOTE),
  addComment: createAction(COMMENT_ADD),
  editComment: createAction(COMMENT_EDIT),
  removeComment: createAction(COMMENT_REMOVE),
  upVoteComment: createAction(COMMENT_UPVOTE),
  downVoteComment: createAction(COMMENT_DOWNVOTE),
  fetchPostsAndCategories: createAction(POSTS_AND_CATEGORIES_FETCH),
  fetchPostDetail: createAction(POST_DETAIL_FETCH)
};
