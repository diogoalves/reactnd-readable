import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import withRoot from '../withRoot';
// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Categories from './Categories';


class App extends Component {
  
  componentDidMount = () => {
    this.props.init();
    console.log("dddd")
  }
 
  render() {
    const { categories, posts } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Readable
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Categories data={categories} />

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
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state)  => ({
  categories: state.categories,
  posts: state.posts
});

const mapDispatchToProps = (dispatch) => ({
  init: () => dispatch({type: 'INIT'})
})

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(App));
