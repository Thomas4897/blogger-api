import React, { Component } from "react";
import BlogsDisplay from "./Component/BlogsDisplay";
import BlogTextUpdater from "./Component/BlogTextUpdater";

import "./App.css";

const URL = "https://6239ddb128bcd99f02763cfe.mockapi.io/blogs";

export class App extends Component {
  state = {
    filteredAuthor: "All",
    blogIdToUpdate: null,
    blogTextToUpdate: "",
    blogsArray: [],
  };

  componentDidMount = async () => {
    const response = await fetch(`${URL}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-control-request-headers": "content-type",
        "x-Trigger": "CORS",
      },
    });

    const fetchedResponse = await response.json();

    this.setState({
      blogsArray: fetchedResponse,
    });
  };

  handleAuthorSelect = (event) => {
    const selectedAuthor = event.target.value;

    this.setState({
      filteredAuthor: selectedAuthor,
    });
  };

  handleSelectBlog = (e) => {
    const blogId = e.target.value;

    const filteredBlogs = this.state.blogsArray.filter((blog) => {
      return String(blog.id) === blogId;
    });
    const selectedBlog = filteredBlogs[0];
    const blogText = selectedBlog.text;

    this.setState({
      blogIdToUpdate: blogId,
      blogTextToUpdate: blogText,
    });
  };

  handleBlogTextUpdate = (event) => {
    const newText = event.target.value;

    const mappedBlogs = this.state.blogsArray.map((blog) => {
      const updatedBlog = blog;

      if (String(blog.id) === this.state.blogIdToUpdate) {
        console.log(updatedBlog.text);
        updatedBlog.text = newText;
      }
      return blog;
    });

    this.setState({
      blogsArray: mappedBlogs,
      blogTextToUpdate: newText,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="author-filter">
            <select className="AuthorSelect" onChange={this.handleAuthorSelect}>
              <option>All</option>
              {this.state.blogsArray.map(({ author }) => {
                return <option value={author}>{author}</option>;
              })}
            </select>
            <BlogTextUpdater
              // key={`Blog-To-Update-${idx}`}
              blogsProp={this.state.blogsArray}
              selectedBlogId={this.state.blogIdToUpdate}
              selectedBlogText={this.state.blogTextToUpdate}
              handleSelectBlog={this.handleSelectBlog}
              handleBlogTextUpdate={this.handleBlogTextUpdate}
            />
          </div>

          {this.state.blogsArray.length <= 0 && (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <div className="BlogList">
            {this.state.blogsArray.map(
              ({ author, createdAt, id, text, title }) => {
                if (
                  author === this.state.filteredAuthor ||
                  this.state.filteredAuthor === "All"
                ) {
                  let formattedText = text.replace(/\n/g, "\n\t");

                  return (
                    <BlogsDisplay
                      key={`Blog-${id}`}
                      authorProp={author}
                      createdAtProp={createdAt}
                      textProp={formattedText}
                      titleProp={title}
                    />
                  );
                } else {
                  return "Error";
                }
              }
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
