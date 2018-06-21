import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import Posts from './Posts';
import OrderBar from './OrderBar';
import { push } from 'connected-react-router';
import { selectOrdering } from '../actions';

class ListPosts extends Component {
  componentDidMount = () => {
    this.props.init();
  };

  filterPosts = (posts, currentCategory) => {
    if (currentCategory) {
      return posts.filter(p => p.category === currentCategory);
    } else {
      return posts;
    }
  };

  orderPosts = (posts = [], ordering) => {
    if (ordering <= 0) {
      return posts.sort((a, b) => a.voteScore < b.voteScore);
    } else {
      return posts.sort((a, b) => a.timestamp < b.timestamp);
    }
  };

  render() {
    const {
      categories,
      currentCategory,
      goTo,
      posts,
      ordering,
      setOrdering
    } = this.props;
    const filtredPosts = this.filterPosts(posts, currentCategory);
    const filteredAndOrderedPosts = this.orderPosts(filtredPosts, ordering);
    return (
      <div>
        <Categories data={categories} selected={currentCategory} goTo={goTo} />
        <Posts posts={filteredAndOrderedPosts} />
        <OrderBar index={ordering} change={setOrdering} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories,
  posts: state.posts,
  currentCategory: ownProps.match.params.category,
  ordering: state.ordering
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch({ type: 'INIT' }),
  goTo: category => dispatch(push(`/${category}`)),
  setOrdering: (event, value) => dispatch(selectOrdering(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);
