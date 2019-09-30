import React from "react";
import { Context } from "../contexts/globalContext";
import { Book } from "./Book";

class Books extends React.Component {
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
        .sendRequest({ url: "/books", method: "GET" })
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

  onClickNew = () => {
    this.props.history.push("/newbook");
  };

  render() {
    return (
      <div className="bounds-content">
        {/* Page Title */}
        <div className="page-title same-line">
          <h1>Books</h1>
          <h2>available for trade</h2>
        </div>

        {/* Books List */}
        <div className="page-body two-column-wrapper">
          {this.state.books.map(book => {
            return <Book key={`book-${book.bookId}`} bookData={book} />;
          })}
        </div>

        {/* Create New Book Button */}
        <button className="button" onClick={this.onClickNew}>
          <i className="fas fa-plus"></i> Create New Book
        </button>
      </div>
    );
  }
}

export { Books };
