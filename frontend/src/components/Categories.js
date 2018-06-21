import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Categories extends React.Component {
  handleChange = (event, value) => {
    const {data, goTo } = this.props;
    if( (value-1) >= 0 && (value-1) < data.length ) {
      goTo(`/${data[value-1].name}`);
    } else {
      goTo('/');
    }
    
  };

  render() {
    const { data, selected } = this.props;
    const value = data.findIndex((e, i) => {
      if (e.name === selected) {
        return true;
      } else {
        return false;
      }
    });

    return (
      <AppBar position="static" color="default">
        <Tabs
          value={value + 1}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
        >
          <Tab label="all" />
          {data && data.map(c => <Tab key={c.name} label={c.name} />)}
        </Tabs>
      </AppBar>
    );
  }
}

export default Categories;
