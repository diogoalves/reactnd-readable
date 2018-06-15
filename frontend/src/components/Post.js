import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';

class Post extends Component {
  render() {
    const { id, timestamp, title, body, author, category } = this.props.data;
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary">{category}</Typography>
          <Typography variant="headline" component="h2">
            {title}
          </Typography>
          <Typography color="textSecondary">
            {`Posted by ${author} on ${format(timestamp, 'DD/MM/YYYY')}`}
          </Typography>
          <Typography component="p">{body}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Remove</Button>
        </CardActions>
      </Card>
    );
  }
}

export default Post;
