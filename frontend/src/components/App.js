import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRoot from '../withRoot';
import Categories from './Categories';
import Posts from './Posts';
import OrderBar from './OrderBar';
import { selectCategory, selectOrdering } from '../actions';

// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const filterPosts = (posts, selectedCategoryIndex, categories) => {
  if (isNaN(selectedCategoryIndex) || selectedCategoryIndex <= 0) {
    return posts;
  }
  const selectedCategoryName = categories[selectedCategoryIndex - 1].name;
  return posts.filter(p => p.category === selectedCategoryName);
};

const orderPosts = (posts = [], ordering) => {
  if (ordering <= 0) {
    return posts.sort((a, b) => a.voteScore < b.voteScore);
  } else {
    return posts.sort((a, b) => a.timestamp < b.timestamp);
    //return posts;
  }
};

class App extends Component {
  componentDidMount = () => {
    this.props.init();
  };

  render() {
    const {
      categories,
      selectedCategoryIndex,
      setCategory,
      posts,
      ordering,
      setOrdering
    } = this.props;
    const filtredPosts = filterPosts(posts, selectedCategoryIndex, categories);
    const filteredAndOrderedPosts = orderPosts(filtredPosts, ordering);
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Categories
              data={categories}
              selectedCategoryIndex={selectedCategoryIndex}
              setCategory={setCategory}
            />
            <OrderBar index={ordering} change={setOrdering} />
            <Posts posts={filteredAndOrderedPosts} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  selectedCategoryIndex: state.selectedCategoryIndex,
  posts: state.posts,
  ordering: state.ordering
});

const mapDispatchToProps = dispatch => ({
  init: () => dispatch({ type: 'INIT' }),
  setCategory: (event, value) => dispatch(selectCategory(value)),
  setOrdering: (event, value) => dispatch(selectOrdering(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(App));
