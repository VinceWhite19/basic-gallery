import React, { Component } from "react";
import PostsGallery from "./components/PostsGallery";
import Button from "./components/Button";
import InputRange from "react-input-range";

export default class App extends Component {
  state = {
    autoRefresh: false,
    value: 0
  };

  toggleAutoRefresh = () => {
    this.setState({
      autoRefresh: !this.state.autoRefresh
    });
  };

  updateFilterRange = value => this.setState({ value });

  render() {
    const { autoRefresh, value } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="text-center p-4">Top Commented</h1>
            <span className="mr-5">Current filter: {value}</span>

            <Button
              autoRefresh={autoRefresh}
              toggleAutoRefresh={this.toggleAutoRefresh}
            />
            <InputRange
              maxValue={100}
              minValue={0}
              value={value}
              onChange={this.updateFilterRange}
            />
            <PostsGallery value={value} autoRefresh={autoRefresh} />
          </div>
        </div>
      </div>
    );
  }
}
