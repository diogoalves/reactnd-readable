import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Categories extends React.Component {
  handleChange = newIndex => {};

  render() {
    const { data, selected, setCategory } = this.props;
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
          onChange={setCategory}
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
