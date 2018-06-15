import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

class Categories extends React.Component {
  render() {
    const { data, selectedCategoryIndex, setCategory } = this.props;

    return (
      <div>
        <AppBar position="static" color="default">
          <Typography variant="button">Readable</Typography>
          <Tabs
            value={selectedCategoryIndex || 0}
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
      </div>
    );
  }
}

export default Categories;
