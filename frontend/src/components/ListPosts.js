import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import OrderBar from './OrderBar';
import { push } from 'connected-react-router';
import { selectOrdering } from '../actions';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class ListPosts extends Component {
  componentDidMount = () => {
    this.props.init();
  };

  filterPosts = (posts, currentCategory) => {
    if (currentCategory) {
      return posts.filter(p => p.category === currentCategory);
    } else {
      return posts;
    }
  };

  orderPosts = (posts = [], ordering) => {
    if (ordering <= 0) {
      return posts.sort((a, b) => a.voteScore < b.voteScore);
    } else {
      return posts.sort((a, b) => a.timestamp < b.timestamp);
    }
  };

  render() {
    const {
      categories,
      currentCategory,
      goTo,
      posts,
      ordering,
      setOrdering,
      goToCreator,
      classes
    } = this.props;
    const filtredPosts = this.filterPosts(posts, currentCategory);
    const filteredAndOrderedPosts = this.orderPosts(filtredPosts, ordering);
    return (
      <div>
        <Categories data={categories} selected={currentCategory} goTo={goTo} />
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={goToCreator('/posts/new')}
        >
          NEW POST
        </Button>

        {filteredAndOrderedPosts &&
          filteredAndOrderedPosts.map(p => (
            <Card key={p.id} className={classes.card}>
              <CardHeader
                className={classes.card}
                title={p.title}
                subheader={`Posted by ${p.author} on ${format(
                  p.timestamp,
                  'DD/MM/YYYY'
                )} in ${p.category} with ${p.voteScore} votes`}
                onClick={goToCreator(`/posts/${p.id}`)}
              />
            </Card>
          ))}

        <OrderBar index={ordering} change={setOrdering} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories,
  posts: state.posts,
  currentCategory: ownProps.match.params.category,
  ordering: state.ordering
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch({ type: 'INIT' }),
  goTo: target => dispatch(push(target)),
  goToCreator: target => () => dispatch(push(target)),
  setOrdering: (event, value) => dispatch(selectOrdering(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ListPosts)
);
