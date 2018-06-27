import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import fourzerofour from './404.svg';

class NotFound extends Component {
  render() {
    const { classes, onClick } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            SORRY, we couldn´t find that Post
          </Typography>
          <img src={fourzerofour} className="App-logo" alt="logo" />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onClick}>
            Try going to main page
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(NotFound);
