import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import { push } from 'connected-react-router'

class ListPosts extends Component {
  componentDidMount = () => {
    this.props.init();
  };

  render() {
    const { categories, currentCategory, goTo } = this.props;
    return (
      <div>
        <Categories data={categories} selected={currentCategory} goTo={goTo} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories,
  posts: state.posts,
  currentCategory: ownProps.match.params.category
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch({ type: 'INIT' }),
  goTo: (category) => dispatch(push(`/${category}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);
