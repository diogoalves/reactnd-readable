import React, { Component } from 'react';
import { Route, Switch } from 'react-router'; // react-router v4
import withRoot from '../withRoot';
import ListPosts from './ListPosts';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ListPosts} />
          <Route exact path="/:category" component={ListPosts} />
          <Route exact path="/:category/:post_id" component={ListPosts} />
          <Route render={() => <div>Miss</div>} />
        </Switch>
      </div>
    );
  }
}

export default withRoot(App);
