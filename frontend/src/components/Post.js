import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removePost, upVotePost, downVotePost } from '../actions';
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit *2
  }
});

class Post extends Component {
  render() {
    const { classes, upVote, downVote, removeVote, goToDetail } = this.props;

    const {
      id,
      timestamp,
      title,
      body,
      author,
      category,
      voteScore
    } = this.props.data;
    return (
      <Link to={`/posts/${id}`}>

      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {title}
          </Typography>
          <Typography color="textSecondary">
            {`Posted by ${author} on ${format(timestamp, 'DD/MM/YYYY')} in ${category} with ${voteScore} votes`}
          </Typography>
          {/* <Button size="small" onClick={goToCreator(`/posts/${id}`)}>OPEN</Button> */}

        </CardContent>
      </Card>
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  goToDetail: () => dispatch(push(`/posts/${ownProps.data.id}`)),
  upVote: () => dispatch(upVotePost(ownProps.data.id)),
  downVote: () => dispatch(downVotePost(ownProps.data.id)),
  removeVote: () => dispatch(removePost(ownProps.data.id))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Post));
