import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRoot from '../withRoot';
import Categories from './Categories';
import Posts from './Posts';

// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const filterPosts = (posts, selectedCategoryIndex, categories) => {
  if (isNaN(selectedCategoryIndex) || selectedCategoryIndex <= 0) {
    return posts;
  }
  const selectedCategoryName = categories[selectedCategoryIndex - 1].name;
  return posts.filter(p => p.category === selectedCategoryName);
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
      posts
    } = this.props;
    const filtredPosts = filterPosts(posts, selectedCategoryIndex, categories);

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Categories
              data={categories}
              selectedCategoryIndex={selectedCategoryIndex}
              setCategory={setCategory}
            />
            <Posts posts={filtredPosts} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  selectedCategoryIndex: state.selectedCategoryIndex,
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  init: () => dispatch({ type: 'INIT' }),
  setCategory: (event, value) =>
    dispatch({ type: 'SELECT_CATEGORY', index: value })
});

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(App));
