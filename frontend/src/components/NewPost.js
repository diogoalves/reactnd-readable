import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { addPost } from '../actions';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  }
});


class NewPost extends Component {

  state = {
    open: false,
    id: null,
    title: '',
    body: '',
    author: '',
    category: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { post, goMainScreen } = this.props;
    const { title, body, author, category } = this.state;
      post(title, body, author, category);
      goMainScreen();
  };

  render() {
    const { classes, goMainScreen, post } = this.props;
    const { title, body, author, category } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subheading" component="h2">
            Write your new post
          </Typography>

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
          <Button size="small" onClick={goMainScreen}>
            CANCEL
          </Button>
          <Button size="small" color="secondary" onClick={this.handleSubmit}>
            POST
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  goMainScreen: () => dispatch(push('/')),
  post: (title, body, author, category) => dispatch(addPost(title, body, author, category)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(NewPost));