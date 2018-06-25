const api = 'http://localhost:3001';

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers }).then(res => res.json());

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());

export const getPost = post_id =>
  fetch(`${api}/posts/${post_id}`, { headers }).then(res => res.json());

export const getCommentsByPostId = post_id =>
  fetch(`${api}/posts/${post_id}/comments`, { headers }).then(res =>
    res.json()
  );

export const getComment = comment_id =>
  fetch(`${api}/coments/${comment_id}`, { headers }).then(res => res.json());

export const addPost = (id, timestamp, title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, timestamp, title, body, author, category })
  }).then(res => res.json());

export const updatePost = (id, timestamp, title, body, author, category) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, timestamp, title, body, author, category })
  }).then(res => res.json());

export const upVotePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote' })
  }).then(res => res.json());

export const downVotePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote' })
  }).then(res => res.json());

export const removePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

export const addComment = (id, timestamp, title, body, author, parentId) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, timestamp, title, body, author, parentId })
  }).then(res => res.json());

export const updateComment = (id, timestamp, title, body, author, parentId) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, timestamp, title, body, author, parentId })
  }).then(res => res.json());

export const upVoteComment = id =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote' })
  }).then(res => res.json());

export const downVoteComment = id =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote' })
  }).then(res => res.json());

export const removeComment = id =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

export default {
  getAllCategories,
  getAllPosts,
  getPost,
  getCommentsByPostId,
  getComment,
  addPost,
  updatePost,
  upVotePost,
  downVotePost,
  removePost,
  addComment,
  updateComment,
  upVoteComment,
  downVoteComment,
  removeComment
};
