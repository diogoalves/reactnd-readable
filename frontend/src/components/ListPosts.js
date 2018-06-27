import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderBar from './OrderBar';
import { push } from 'connected-react-router';
import actions from '../actions';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';
import {
  orderByVoteScore,
  orderByTimeStamp,
  filterDeleted
} from '../utils/sorting';

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
  state = {
    ordering: 0
  };

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

  orderPosts = (posts = []) => {
    const { ordering } = this.state;
    if (ordering <= 0) {
      return orderByVoteScore(posts);
    } else {
      return orderByTimeStamp(posts);
    }
  };

  handleOrdering = (event, value) => {
    this.setState({ ordering: value });
  };

  render() {
    const {
      currentCategory,
      posts,
      goToCreator,
      upVoteCreator,
      downVoteCreator,

      classes
    } = this.props;
    const { ordering } = this.state;

    const filteredDeleted = filterDeleted(posts);
    const filtredPosts = this.filterPosts(filteredDeleted, currentCategory);
    const filteredAndOrderedPosts = this.orderPosts(filtredPosts, ordering);
    return (
      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={goToCreator('/posts/new')}
        >
          NEW POST
        </Button>

        {filteredAndOrderedPosts &&
          filteredAndOrderedPosts.map((p, i) => (
            <Card key={i} className={classes.card}>
              <CardHeader
                className={classes.card}
                title={p.title}
                subheader={`Posted by ${p.author} on ${format(
                  p.timestamp,
                  'DD/MM/YYYY'
                )} in ${p.category} with ${p.voteScore} votes. ${
                  p.commentCount
                } comments`}
              />
              <CardActions>
                <Button size="small" onClick={upVoteCreator(p.id)}>
                  ▲UPVOTE
                </Button>
                <Button size="small" onClick={downVoteCreator(p.id)}>
                  ▼DOWNVOTE
                </Button>
                <Button size="small" onClick={goToCreator(`/posts/${p.id}`)}>
                  OPEN
                </Button>
              </CardActions>
            </Card>
          ))}

        <OrderBar index={ordering} change={this.handleOrdering} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  currentCategory: ownProps.match.params.category
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch(actions.fetchPosts()),
  goToCreator: target => () => dispatch(push(target)),
  upVoteCreator: post_id => () => dispatch(actions.upVotePost({ post_id })),
  downVoteCreator: post_id => () => dispatch(actions.downVotePost({ post_id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ListPosts)
);
