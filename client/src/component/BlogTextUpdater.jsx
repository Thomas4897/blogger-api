import React, { Component } from "react";

export default class BlogTextUpdater extends Component {
  render() {
    return (
      <div className="blog-text-updater">
        <select onChange={this.props.handleSelectBlog}>
          {this.props.blogsProp.map((blog) => {
            return (
              <option key={blog.id} value={blog.id}>
                {blog.author}
              </option>
            );
          })}
        </select>
        <input
          className="text-to-update-input"
          value={this.props.selectedBlogText}
          onChange={this.props.handleBlogTextUpdate}
          type="text"
        />
      </div>
    );
  }
}