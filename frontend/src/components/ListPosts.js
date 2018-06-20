import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';

class ListPosts extends Component {
  componentDidMount = () => {
    this.props.init();
  };

  render() {
    const { categories, currentCategory } = this.props;
    console.log(this);
    return (
      <div>
        <Categories data={categories} selected={currentCategory} />
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
  init: () => dispatch({ type: 'INIT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);
