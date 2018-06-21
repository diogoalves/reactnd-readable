import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { removePost, upVotePost, downVotePost } from '../actions';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  }
});

class PostDetail extends Component {
  componentDidMount = () => {
    this.props.init();
  };

  render() {
    const { classes, goMainScreen, post, upVote, downVote, removePost } = this.props;

    return (
      <Link to="/about">
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="title" component="h2">
            {post.title}
          </Typography>
          <Typography color="textSecondary">
            {`Posted by ${post.author} on ${format(post.timestamp, 'DD/MM/YYYY')}`}
          </Typography>
          <Typography component="p">{post.body}</Typography>
          <Typography color="textSecondary">{`${post.voteScore} votes`}</Typography>


        </CardContent>
        <CardActions>
        <Button size="small" onClick={upVote}>
            ▲UPVOTE
          </Button>
          <Button size="small" onClick={downVote}>
            ▼DOWNVOTE
          </Button>
          <Button size="small" onClick={removePost}>
            REMOVE
          </Button>
          <Button size="small" onClick={goMainScreen}>
            CANCEL
          </Button>
        </CardActions>
      </Card>
      </Link>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: state.posts.find(e => e.id === ownProps.match.params.post_id) || {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch({ type: 'INIT' }),
  goMainScreen: () => dispatch(push('/')),
  upVote: () => dispatch(upVotePost(ownProps.match.params.post_id)),
  downVote: () => dispatch(downVotePost(ownProps.match.params.post_id)),
  removeVote: () => dispatch(removePost(ownProps.match.params.post_id))  
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostDetail));