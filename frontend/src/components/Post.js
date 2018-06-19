import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  }
});

class Post extends Component {
  render() {
    const { classes } = this.props;

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
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textSecondary">{category}</Typography>
          <Typography variant="headline" component="h2">
            {title}
          </Typography>
          <Typography color="textSecondary">
            {`Posted by ${author} on ${format(timestamp, 'DD/MM/YYYY')}`}
          </Typography>
          <Typography component="p">{body}</Typography>
          <Typography color="textSecondary">{`${voteScore} votes`}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">OPEN</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
