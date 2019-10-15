import React from "react";
import { Context } from "../contexts/globalContext";
import { Book } from "./Book";
import DocumentTitle from "react-document-title";

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
          if (error.response) {
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
      <DocumentTitle
        title={`${
          this.state.username !== ""
            ? this.state.username
            : "User's Books - Book Trader"
        }'s Books - Book Trader`}
      >
        <div className="page-bounds">
          {/* Is username ready? */}
          {this.state.username !== "" ? (
            <div className="wrapper__100">
              {/* Page Title */}
              <div className="page-header">
                <h1>{this.state.username}'s Books</h1>
              </div>

              {/* Books List */}
              {this.state.books.length ? (
                <div className="page-main  page-main--two-columns">
                  {this.state.books.map(book => {
                    return <Book key={`book-${book.bookId}`} bookData={book} />;
                  })}
                </div>
              ) : (
                <div className="page-header">
                  <h2>Nothing found.</h2>
                </div>
              )}
              {this.context.user &&
              this.context.user.userId ===
                parseInt(this.props.match.params.id) ? (
                // Create New Book Button *
                <button className="button" onClick={this.onClickNew}>
                  <i className="fas fa-plus"></i> Create New Book
                </button>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="page-bounds">
              <div className="page-header">
                <h1>Loading...</h1>
              </div>
            </div>
          )}
        </div>
      </DocumentTitle>
    );
  }
}

export { UserBooks };
