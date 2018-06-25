import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import actions from '../actions';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  },
  button: {
    position: 'absolute',
    right: theme.spacing.unit * 4
  }
});

class FormComment extends Component {
  state = {
    id: this.props.initialValues.id,
    title: this.props.initialValues.title || '',
    body: this.props.initialValues.body || '',
    author: this.props.initialValues.author || '',
    parentId: this.props.initialValues.parentId || ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { post, update, goBack, post_id } = this.props;
    if (this.state.id) {
      update({ ...this.state });
    } else {
      post({ ...this.state, parentId: post_id });
    }

    goBack();
  };

  render() {
    const { classes, goBack } = this.props;
    const { body, author } = this.state;
    return (
      <Card className={classes.card}>
        <CardHeader
          title="Write your comment"
          action={
            <IconButton>
              <CancelIcon onClick={goBack} />
            </IconButton>
          }
        />

        <CardContent>
          <form noValidate autoComplete="off">
            <TextField
              id="body"
              label="body"
              value={body}
              onChange={this.handleChange('body')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="author"
              label="author"
              value={author}
              onChange={this.handleChange('author')}
              margin="normal"
              fullWidth
            />
          </form>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            color="secondary"
            onClick={this.handleSubmit}
          >
            POST
          </Button>
          <br />
          <br />
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues:
    state.comments.find(e => e.id === ownProps.match.params.comment_id) || {},
  post_id: ownProps.match.params.post_id
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(goBack()),
  post: payload => dispatch(actions.addComment(payload)),
  update: payload => dispatch(actions.editComment(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(FormComment)
);
