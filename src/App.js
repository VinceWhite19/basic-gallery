import React, { Component } from "react";
import PostsGallery from "./components/PostsGallery";
import Button from "./components/Button";
import InputRange from "react-input-range";

export default class App extends Component {
  state = {
    autoRefresh: false,
    filterValue: 0,
    posts: [],
    loading: false
  };

  getPosts = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        `https://www.reddit.com/r/reactjs.json?limit=100`
      );
      const result = await response.json();
      const posts = result.data.children.map(obj => obj.data);

      this.setState({
        posts: posts,
        loading: false
      });
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getPosts();
  }

  toggleAutoRefresh = () => {
    this.setState(
      state => ({
        autoRefresh: !state.autoRefresh
      }),
      () => {
        if (this.state.autoRefresh) {
          this.interval = setInterval(this.getPosts, 3000);
        } else {
          clearInterval(this.interval);
        }
      }
    );
  };

  updateFilterRange = filterValue => this.setState({ filterValue });

  render() {
    const { autoRefresh, filterValue, posts, loading } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="text-center p-4">Top Commented</h1>
            <span className="mr-5">Current filter: {filterValue}</span>

            <Button
              autoRefresh={autoRefresh}
              toggleAutoRefresh={this.toggleAutoRefresh}
            />
            <InputRange
              maxValue={300}
              minValue={0}
              value={filterValue}
              onChange={this.updateFilterRange}
            />
            <PostsGallery
              value={filterValue}
              posts={posts}
              loading={loading}
              autoRefresh={autoRefresh}
            />
          </div>
        </div>
      </div>
    );
  }
}
