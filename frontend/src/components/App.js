import React, { Component } from 'react';
import { Route, Switch } from 'react-router'; // react-router v4
import withRoot from '../withRoot';
import ListPosts from './ListPosts';
import FormPost from './FormPost';
import FormComment from './FormComment';
import PostDetail from './PostDetail';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ListPosts} />
          <Route exact path="/posts/new" component={FormPost} />
          <Route exact path="/posts/:post_id" component={PostDetail} />
          <Route exact path="/posts/:post_id/edit" component={FormPost} />
          <Route
            exact
            path="/posts/:post_id/new_comment"
            component={FormComment}
          />
          <Route
            exact
            path="/posts/:post_id/edit_comment/:comment_id"
            component={FormComment}
          />
          <Route exact path="/:category/:post_id" component={PostDetail} />
          <Route exact path="/:category" component={ListPosts} />
          <Route component={ListPosts} />
        </Switch>
      </div>
    );
  }
}

export default withRoot(App);
