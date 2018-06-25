import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { format } from 'date-fns';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import actions from '../actions';

const styles = theme => ({
  card: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  button: {
    marginLeft: theme.spacing.unit * 4,
    marginUp: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit
  }
});

class Comments extends Component {
  render() {
    const {
      classes,
      comments,
      goToAddComment,
      editCommentCreator,
      upVoteCreator,
      downVoteCreator,
      removeCreator
    } = this.props;

    return (
      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={goToAddComment}
        >
          ADD COMMENT
        </Button>
        {comments &&
          comments.map(c => (
            <Card key={c.id} className={classes.card}>
              <CardContent className={classes.card}>
                <Typography component="p">{c.body}</Typography>
                <Typography variant="caption">
                  {`by ${c.author} on ${format(
                    c.timestamp,
                    'DD/MM/YYYY'
                  )} with ${c.voteScore} votes`}
                  <Button size="small" onClick={editCommentCreator(c.id)}>
                    ✎
                  </Button>
                  <Button size="small" onClick={upVoteCreator(c.id)}>
                    ▲
                  </Button>
                  <Button size="small" onClick={downVoteCreator(c.id)}>
                    ▼
                  </Button>
                  <Button size="small" onClick={removeCreator(c.id)}>
                    🗑
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  comments: state.comments
    .filter(e => e.parentId === ownProps.post_id && !e.deleted)
    .sort((a, b) => a.voteScore < b.voteScore)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  goToAddComment: () =>
    dispatch(push(`/posts/${ownProps.post_id}/new_comment`)),
  editCommentCreator: comment_id => () =>
    dispatch(push(`/posts/${ownProps.post_id}/edit_comment/${comment_id}`)),
  upVoteCreator: comment_id => () =>
    dispatch(actions.upVoteComment({ comment_id, post_id: ownProps.post_id })),
  downVoteCreator: comment_id => () =>
    dispatch(
      actions.downVoteComment({ comment_id, post_id: ownProps.post_id })
    ),
  removeCreator: comment_id => () =>
    dispatch(actions.removeComment({ comment_id, post_id: ownProps.post_id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Comments)
);
