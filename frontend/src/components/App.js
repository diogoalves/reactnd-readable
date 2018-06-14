import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import withRoot from '../withRoot';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class App extends Component {
  render() {
    //const { categories } = this.props;
    const { match } = this.props;
    console.log(this.props);
    const categories = ['react', 'redux', 'udacity'];
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Readable
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <br />
          <Paper elevation={4}>
            <Typography variant="headline" component="h3">
              Categories:
            </Typography>
            <Typography component="p">
              {categories.map(c => (
                <span key={c}>
                  <Link to={'/' + c}>{c}</Link>{' '}
                </span>
              ))}
            </Typography>
          </Paper>

          <Switch>
            <Route exact path="/" render={() => <div>Lista posts</div>} />
            <Route path="/posts/new" render={() => <div>Adiciona post</div>} />
            <Route
              path="/posts/:id/edit"
              render={() => <div>Edita post</div>}
            />
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
              render={() => <div>Lista posts de categoria </div>}
            />
            <Route render={() => <div>Miss</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect()(withRoot(App));
