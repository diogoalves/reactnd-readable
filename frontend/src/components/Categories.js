import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Categories extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
            <Typography variant="button">
                Categories:
            </Typography>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="all" />
            <Tab label="react" />
            <Tab label="redux" />
            <Tab label="udacity" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
            <Tab label="Item One2" />
            <Tab label="Item Two2" />
            <Tab label="Item Three2" />
            <Tab label="Item Four2" />
            <Tab label="Item Five2" />
            <Tab label="Item Six2" />
            <Tab label="Item Seven2" />            
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>}
        {value === 7 && <TabContainer>Item One2</TabContainer>}
        {value === 8 && <TabContainer>Item Two2</TabContainer>}
        {value === 9 && <TabContainer>Item Three2</TabContainer>}
        {value === 10 && <TabContainer>Item Four2</TabContainer>}
        {value === 11 && <TabContainer>Item Five2</TabContainer>}
        {value === 12 && <TabContainer>Item Six2</TabContainer>}
        {value === 13 && <TabContainer>Item Seven2</TabContainer>}
      </div>
    );
  }
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);