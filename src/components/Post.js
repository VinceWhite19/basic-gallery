import React, { PureComponent } from "react";
import Placeholder from "./placeholder.jpg";
import PropTypes from "prop-types";

export class Post extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render() {
    const { post } = this.props;
    let thumbnail;
    if (post.thumbnail.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      thumbnail = post.thumbnail;
    } else {
      thumbnail = Placeholder;
    }
    return (
      <div className="col-4">
        <img className="card-img-top card-img--height" src={thumbnail} alt="" />
        <div className="card-body">
          <h6 className="card-title">{post.title}</h6>
          <p className="card-text">Number of comments: {post.num_comments}</p>
          <a href={post.permalink}>Link</a>
        </div>
      </div>
    );
  }
}

export default Post;
