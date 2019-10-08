import React, { PureComponent } from "react";
import Post from "./Post";
import { Spinner, Alert } from "reactstrap";
import PropTypes from "prop-types";

export default class PostsGallery extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired
  };

  getPostsByComments = posts =>
    posts
      .filter(post => post.num_comments >= this.props.value)
      .sort((a, b) => b.num_comments - a.num_comments);

  render() {
    const { loading, posts } = this.props;
    const postsByComments = this.getPostsByComments(posts);

    return (
      <div className="row mt-5">
        {loading ? (
          <Spinner color="primary" />
        ) : postsByComments.length > 0 ? (
          postsByComments.map(post => <Post key={post.id} post={post} />)
        ) : (
          <Alert color="primary">No results found matching your criteria</Alert>
        )}
      </div>
    );
  }
}
