import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';

class OrderBar extends Component {
  render() {
    const { index, change } = this.props;
    return (
      <BottomNavigation value={index || 0} onChange={change} showLabels>
        <BottomNavigationAction
          label="More voted first"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="More recent first"
          icon={<RestoreIcon />}
        />
      </BottomNavigation>
    );
  }
}

export default OrderBar;
