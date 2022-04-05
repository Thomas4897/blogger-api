import React, { Component } from "react";

export default class BlogsDisplay extends Component {
  render() {
    return (
      <div className="BlogPost">
        <h3>{this.props.titleProp}</h3>
        <div className="Author">Author: {this.props.authorProp}</div>
        <div className="CreatedAt">Created: {this.props.createdAtProp}</div>
        <div className="Text">{this.props.textProp}</div>
      </div>
    );
  }
}
