import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  render() {
    const { posts } = this.props;
    return <div>{posts && posts.map(p => <Post key={p.id} data={p} />)}</div>;
  }
}

export default Posts;
