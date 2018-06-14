import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <div>Lista posts</div>} />
          <Route path="/posts/new" render={() => <div>Adiciona post</div>} />
          <Route path="/posts/:id/edit" render={() => <div>Edita post</div>} />
          <Route path="/posts/:id" render={() => <div>Detalha post</div>} />
          <Route
            path="/comment/:id/edit"
            render={() => <div>Edita post</div>}
          />
          <Route
            path="/comment/:id"
            render={() => <div>Edita comentário</div>}
          />
          <Route
            path="/:category"
            render={() => <div>Lista posts de categoria</div>}
          />
          <Route render={() => <div>Miss</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
