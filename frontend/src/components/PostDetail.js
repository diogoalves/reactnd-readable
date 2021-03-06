import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'connected-react-router';
import { format } from 'date-fns';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import actions from '../actions';
import Comments from './Comments';
import NotFound from './NotFound';

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
    const {
      classes,
      post_id,
      edit,
      goBack,
      goMainScreen,
      post,
      upVote,
      downVote,
      removePost
    } = this.props;

    if (!post) {
      return <NotFound onClick={goMainScreen} />;
    }

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            className={classes.card}
            title={post.title}
            subheader={`Posted by ${post.author} on ${format(
              post.timestamp,
              'DD/MM/YYYY'
            )} in ${post.category} with ${post.voteScore} votes ${
              post.commentCount
            } comments`}
            action={
              <IconButton>
                <CancelIcon onClick={goBack} />
              </IconButton>
            }
          />
          <CardContent>
            <Typography component="p">{post.body}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={edit}>
              ✎EDIT
            </Button>
            <Button size="small" onClick={upVote}>
              ▲UPVOTE
            </Button>
            <Button size="small" onClick={downVote}>
              ▼DOWNVOTE
            </Button>
            <Button size="small" onClick={removePost}>
              🗑REMOVE
            </Button>
          </CardActions>
        </Card>
        <Comments post_id={post_id} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post_id: ownProps.match.params.post_id,
  post: state.posts.find(e => e.id === ownProps.match.params.post_id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () =>
    dispatch(
      actions.fetchPostDetail({ post_id: ownProps.match.params.post_id })
    ),
  edit: () => dispatch(push(`/posts/${ownProps.match.params.post_id}/edit`)),
  goBack: () => dispatch(goBack()),
  goMainScreen: () => dispatch(push('/')),
  upVote: () =>
    dispatch(actions.upVotePost({ post_id: ownProps.match.params.post_id })),
  downVote: () =>
    dispatch(actions.downVotePost({ post_id: ownProps.match.params.post_id })),
  removePost: () => {
    dispatch(actions.removePost({ post_id: ownProps.match.params.post_id }));
    dispatch(push('/'));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PostDetail)
);
