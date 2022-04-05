import React, { Component } from "react";

export default class BlogsDisplay extends Component {
  render() {
    return (
      <div className="BlogPost">
        <h3>{this.props.titleProp}</h3>
        <div className="Author">Author: {this.props.authorProp}</div>
        <div className="CreatedAt">Created: {this.props.createdAtProp}</div>
        <p className="Text">
          {"\t"} {this.props.textProp}
        </p>
      </div>
    );
  }
}
