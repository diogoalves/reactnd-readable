import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: 0
  }
});

class FormPost extends Component {
  state = {
    open: false,
    id: null,
    title: '',
    body: '',
    author: '',
    category: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      id: null,
      title: '',
      body: '',
      author: '',
      category: ''
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { id, title, body, author, category } = this.state;
    if (!id) {
      this.props.addPost(title, body, author, category);
    } else {
      this.props.editPost(id, title, body, author, category);
    }

    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          variant="fab"
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Post</DialogTitle>
          <DialogContent>
            <form noValidate autoComplete="off">
              <TextField
                id="title"
                label="title"
                value={this.state.title}
                onChange={this.handleChange('title')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="body"
                label="body"
                value={this.state.body}
                onChange={this.handleChange('body')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="author"
                label="author"
                value={this.state.author}
                onChange={this.handleChange('author')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="category"
                label="category"
                value={this.state.category}
                onChange={this.handleChange('category')}
                margin="normal"
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FormPost);
