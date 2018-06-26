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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';
import actions from '../actions';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  },
  button: {
    position: 'absolute',
    right: theme.spacing.unit * 4
  },
  formControl: {
    marginTop: theme.spacing.unit,
    minWidth: 250
  }
});

class FormPost extends Component {
  state = {
    id: this.props.initialValues.id || '',
    title: this.props.initialValues.title || '',
    body: this.props.initialValues.body || '',
    author: this.props.initialValues.author || '',
    category:
      this.props.initialValues.category ||
      (this.props.categories[0] && this.props.categories[0].name) ||
      ''
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
    const { classes, goBack, categories } = this.props;
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
            <FormControl className={classes.formControl}>
              <InputLabel>category</InputLabel>
              <Select
                value={category}
                onChange={this.handleChange('category')}
                inputProps={{
                  name: 'category',
                  id: 'category'
                }}
              >
                {categories &&
                  categories.map(c => (
                    <MenuItem key={c.name} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
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
    state.posts.find(e => e.id === ownProps.match.params.post_id) || {},
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(goBack()),
  post: payload => dispatch(actions.addPost(payload)),
  update: payload => dispatch(actions.editPost(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(FormPost)
);
