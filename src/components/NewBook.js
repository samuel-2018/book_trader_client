import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";
import { PrivateRoute } from "./PrivateRoute";

class NewBook extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      genre: "",
      year: "",
      condition: "",
      comments: ""
    };
  }

  onFormSubmit = async event => {
    event.preventDefault();
    try {
      console.log("form submit pressed");
      // Get user auth info
      const { username, password } = this.context.authenticatedUser;

      const data = {
        title: this.state.title,
        author: this.state.author,
        genre: this.state.genre,
        year: this.state.year,
        state: this.state.state,
        condition: this.state.condition,
        comments: this.state.comments
      };

      const response = await this.context.sendRequest({
        url: "/books",
        method: "POST",
        username,
        password,
        data
      });
      const { bookId } = response.data;
      // Go to book details page for this new book.
      this.props.history.push(`/books/${bookId}`);
    } catch (error) {
      this.context.handleError.call(this, { error });
    }
  };

  onCancel = () => {
    this.props.history.push("/books");
  };

  render() {
    return (
      <>
        {/* Page Title */}
        <div className="page-title">
          <h1>New Book</h1>
        </div>

        {/* Validation Errors */}
        {this.context.validationMessages(this.state.validationErrors)}

        {/* Form */}

        <form onSubmit={this.onFormSubmit}>
          <label className="label">
            Title <br />
            <input
              type="text"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
              className="input"
            />
          </label>
          <label className="label">
            Author <br />
            <input
              type="text"
              value={this.state.author}
              onChange={e => this.setState({ author: e.target.value })}
              className="input"
            />
          </label>
          <label className="label">
            Genre <br />
            <input
              type="text"
              value={this.state.genre}
              onChange={e => this.setState({ genre: e.target.value })}
              className="input"
            />
          </label>

          <label className="label">
            Year <br />
            <input
              type="text"
              value={this.state.year}
              onChange={e => this.setState({ year: e.target.value })}
              className="input"
            />
          </label>

          <label className="label">
            Condition <br />
            <input
              type="text"
              value={this.state.condition}
              onChange={e => this.setState({ condition: e.target.value })}
              className="input"
            />
          </label>
          <label className="label">
            Comments <br />
            <textarea
              type="text"
              value={this.state.comments}
              onChange={e => this.setState({ comments: e.target.value })}
              className="input"
            />
          </label>

          <button type="submit">Submit</button>
          <button onClick={this.onCancel}>Cancel</button>
        </form>
      </>
    );
  }
}

// Wraps component in HOC,
// restricting page to signed-in users.
export const NewBookWithPR = PrivateRoute(NewBook);
