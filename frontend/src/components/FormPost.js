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

class FormPost extends Component {
  state = {
    id: this.props.initialValues.id || '',
    title: this.props.initialValues.title || '',
    body: this.props.initialValues.body || '',
    author: this.props.initialValues.author || '',
    category: this.props.initialValues.category || ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { post, update, goBack } = this.props;
    if (this.state.id) {
      update({ ...this.state });
    } else {
      post({ ...this.state });
    }
    goBack();
  };

  render() {
    const { classes, goBack } = this.props;
    const { title, body, author, category } = this.state;
    return (
      <Card className={classes.card}>
        <CardHeader
          title="Write your post"
          action={
            <IconButton>
              <CancelIcon onClick={goBack} />
            </IconButton>
          }
        />

        <CardContent>
          <form noValidate autoComplete="off">
            <TextField
              id="title"
              label="title"
              value={title}
              onChange={this.handleChange('title')}
              margin="normal"
              fullWidth
            />
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
            <TextField
              id="category"
              label="category"
              value={category}
              onChange={this.handleChange('category')}
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
    state.posts.find(e => e.id === ownProps.match.params.post_id) || {}
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(goBack()),
  post: payload => dispatch(actions.addPost(payload)),
  update: payload => dispatch(actions.editPost(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(FormPost)
);
