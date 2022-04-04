import React, { Component } from "react";
import "./App.css";
import BlogsDisplay from "./component/BlogsDisplay";

const URL = "https://6239ddb128bcd99f02763cfe.mockapi.io/blogs";

export class App extends Component {
  state = {
    // author: "",
    // createdAt: "",
    // id: "",
    // text: "",
    // title: "",
    isFiltered: false,
    filteredAuthor: "All",
    blogsArray: [],
  };

  componentDidMount = async () => {
    // console.log(userName);
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

    console.log(fetchedResponse);

    this.setState({
      blogsArray: fetchedResponse,
    });
  };

  handleAuthorSelect = (event) => {
    const selectedAuthor = event.target.value;
    const filteredBlogsArray = this.state.blogsArray.filter((element) => {
      return element.author === selectedAuthor;
    });

    this.setState({
      isFiltered: true,
      filteredAuthor: selectedAuthor,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <select className="AuthorSelect" onChange={this.handleAuthorSelect}>
            <option>All</option>
            {this.state.blogsArray.map(({ author }) => {
              return <option>{author}</option>;
            })}
          </select>
          <div className="BlogList">
            {this.state.blogsArray.map(
              ({ author, createdAt, id, text, title }) => {
                return (
                  <BlogsDisplay
                    key={id}
                    authorProp={author}
                    createdAtProp={createdAt}
                    textProp={text}
                    titleProp={title}
                  />
                );
              }
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
