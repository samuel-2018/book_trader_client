import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";
import { Book } from "./Book";

class UserBooks extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = { books: [] };
  }

  componentDidMount() {
    // Calls API, updates state with course data.
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
            books: result.data
          });
        })
        .catch(error => {
          this.context.handleError.call(this, { error });
        });
    })();
  }

  render() {
    return (
      <>
        {this.state.books.length ? (
          <>
            {/* Page Title */}
            <div className="page-title">
              <h1>{this.state.books[0].owner.username}'s Books</h1>
            </div>

            {/* Books List */}
            <div>
              {this.state.books.map(book => {
                return <Book key={`book-${book.bookId}`} bookData={book} />;
              })}
            </div>

            {/* Create New Book Button */}
            <div className="button">
              <Link
                to={{
                  pathname: `/newbook`,
                  state: { from: this.props.location }
                }}
              >
                <h3>
                  <i className="fas fa-plus"></i>
                  Create New Book
                </h3>
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export { UserBooks };
