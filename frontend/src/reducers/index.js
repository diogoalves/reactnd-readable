import {
  CATEGORIES_FETCH_SUCCESSFUL,
  POSTS_FETCH_SUCCESSFUL,
  POST_DETAIL_FETCH_SUCCESSFUL
} from '../actions';

export const initialState = {
  categories: [],
  posts: [],
  comments: []
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_FETCH_SUCCESSFUL:
      return {
        ...state,
        categories: payload.categories
      };

    case POSTS_FETCH_SUCCESSFUL:
      return {
        ...state,
        posts: payload.posts
      };

    case POST_DETAIL_FETCH_SUCCESSFUL:
      const { post, comments } = payload;
      const oldPosts = state.posts.filter(e => e.id !== post.id);
      return {
        ...state,
        posts: [...oldPosts, post],
        comments: comments
      };

    default:
      return state;
  }
};

export default reducer;
