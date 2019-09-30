import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";
import { Book } from "./Book";

// Shows all books from one user.

class UserBooks extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = { books: [], username: "" };
  }

  componentDidMount() {
    // Calls API, updates state with book data.
    // (Updating state must be done outside of render.)
    (() => {
      this.context
        .sendRequest({
          url: `/books/owner/${this.props.match.params.id}`,
          method: "GET"
        })
        .then(result => {
          // Stores data in state.
          this.setState({
            books: result.data,
            username: result.data[0].owner.username
          });
        })
        .catch(error => {
          // If no books, get owner data.
          // (Needed to get username.)
          if (error.response.status === 404) {
            this.context
              .sendRequest({
                url: `/users/${this.props.match.params.id}`,
                method: "GET"
              })
              .then(result => {
                // Stores data in state.
                this.setState({
                  username: result.data.username
                });
              })
              .catch(error => {
                this.context.handleError.call(this, { error });
              });
          } else {
            this.context.handleError.call(this, { error });
          }
        });
    })();
  }

  onClickNew = () => {
    this.props.history.push("/newbook");
  };

  render() {
    return (
      <div className="bounds-content">
        {this.state.username !== "" ? (
          <div className="wrapper__100">
            {/* Page Title */}
            <div className="page-title">
              <h1>{this.state.username}'s Books</h1>
            </div>

            {/* Books List */}
            {this.state.books.length ? (
              <div className="page-body">
                {this.state.books.map(book => {
                  return <Book key={`book-${book.bookId}`} bookData={book} />;
                })}
              </div>
            ) : (
              <div className="box-title request__body request message-box__full">
                Nothing Found
              </div>
            )}

            {/* Create New Book Button */}
            <button className="button" onClick={this.onClickNew}>
              <i className="fas fa-plus"></i> Create New Book
            </button>
          </div>
        ) : (
          <div className="box-title request__body request">Loading...</div>
        )}
      </div>
    );
  }
}

export { UserBooks };
