import React, { Component } from "react";
import Post from "./Post";
import { Spinner, Alert } from "reactstrap";
import axios from "axios";
import PropTypes from "prop-types";

export default class PostsGallery extends Component {
  state = {
    posts: [],
    loading: false
  };

  static propTypes = {
    value: PropTypes.number.isRequired,
    autoRefresh: PropTypes.bool.isRequired
  };
  getPosts = async () => {
    this.setState({ loading: true });
    try {
      const result = await axios.get(
        `https://www.reddit.com/r/reactjs.json?limit=100`
      );

      const posts = result.data.data.children.map(obj => obj.data);
      const postsSorted = posts.sort((a, b) => b.num_comments - a.num_comments);

      const filter = postsSorted.filter(
        post => post.num_comments >= this.props.value
      );

      this.setState({
        posts: filter,
        loading: false
      });
    } catch (err) {
      console.error(err);
    }
  };

  refreshPosts = delay =>
    setTimeout(
      function request() {
        this.getPosts();
        if (this.props.autoRefresh) {
          setTimeout(request.bind(this), delay);
        }
      }.bind(this),
      delay
    );

  componentDidMount() {
    if (this.props.autoRefresh) {
      this.refreshPosts(3000);
    } else {
      this.getPosts();
    }
  }

  componentDidUpdate(prevProps) {
    const { autoRefresh, value } = this.props;
    if (autoRefresh && autoRefresh !== prevProps.autoRefresh) {
      this.refreshPosts(3000);
    }

    if (value !== prevProps.value) {
      this.getPosts();
    }
  }

  render() {
    const { posts, loading } = this.state;

    if (loading) {
      return <Spinner color="primary" />;
    } else if (posts.length === 0) {
      return (
        <Alert color="primary">No results found matching your criteria</Alert>
      );
    } else {
      return (
        <div className="row mt-5">
          {posts.map(post => {
            return <Post key={post.id} post={post} />;
          })}
        </div>
      );
    }
  }
}
