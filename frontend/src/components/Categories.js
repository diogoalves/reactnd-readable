import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import actions from '../actions';

class Categories extends React.Component {
  componentDidMount = () => {
    this.props.init();
  };

  handleChange = (event, value) => {
    const { data, goTo } = this.props;
    if (value - 1 >= 0 && value - 1 < data.length) {
      goTo(`/${data[value - 1].name}`);
    } else {
      goTo('/');
    }
  };

  render() {
    const { data, selected } = this.props;
    return (
      <AppBar position="static" color="default">
        <Tabs
          value={selected}
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
const mapStateToProps = state => ({
  data: state.categories,
  selected:
    state.categories.findIndex(e =>
      state.router.location.pathname.includes(e.name)
    ) + 1
});

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(actions.fetchCategories()),
  goTo: target => dispatch(push(target))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
