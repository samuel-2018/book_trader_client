import React from "react";
import { Context } from "../contexts/globalContext";
import { BookTradeRequests } from "./BookTradeRequests";
import { Link } from "react-router-dom";

class BookDetails extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = { book: null };
  }

  componentDidMount() {
    // Calls API, updates state with book data.
    // (Updating state must be done outside of render.)
    (() => {
      const bookId = this.props.match.params.id;
      this.context
        .sendRequest({ url: `/books/${bookId}`, method: "GET" })
        .then(result => {
          // Stores data in state.
          this.setState({
            book: result.data
          });
        })
        .catch(error => {
          this.context.handleError.call(this, { error });
        });
    })();
  }

  onAddToBasket = () => {
    const bookId = this.props.match.params.id;
    this.context.onAddToBasket({ bookId });
  };

  onRemoveFromBasket = () => {
    const bookId = this.props.match.params.id;
    this.context.onRemoveFromBasket({ bookId });
  };

  onDelete = async () => {
    const bookId = this.props.match.params.id;
    try {
      // Get user auth info
      const { username, password } = await this.context.authenticatedUser;

      // Delete request from database
      await this.context.sendRequest({
        url: `/books/${bookId}`,
        method: "DELETE",
        username,
        password
      });
      // Go to main page
      this.props.history.replace("/books");
    } catch (error) {
      // It provides handleError with location/history.
      this.context.handleError.call(this, { error });
    }
  };

  render() {
    const { location } = this.props;
    return (
      <div className="bounds-content">
        {/* Page Title */}
        <div className="page-title">
          <h1>Book Details</h1>
        </div>
        {/* Book Details */}

        {this.state.book ? (
          <div className="page-body">
            <dl className="book-details ">
              <dt className="book-details__name ">Title:</dt>
              <dd className="book-details__value ">{this.state.book.title}</dd>

              <dt className="book-details__name ">Author:</dt>
              <dd className="book-details__value ">{this.state.book.author}</dd>

              <dt className="book-details__name ">Genre:</dt>
              <dd className="book-details__value ">{this.state.book.genre}</dd>

              <dt className="book-details__name ">Year:</dt>
              <dd className="book-details__value ">{this.state.book.year}</dd>

              <dt className="book-details__name ">Condition:</dt>
              <dd className="book-details__value ">
                {this.state.book.condition}
              </dd>

              <dt className="book-details__name ">Comments:</dt>
              <dd className="book-details__value ">
                {this.state.book.comments}
              </dd>

              <dt className="book-details__name ">Owner:</dt>
              <dd className="book-details__value ">
                <Link
                  to={{
                    pathname: `/users/${this.state.book.ownerId}`,
                    state: { from: location }
                  }}
                >
                  {" "}
                  {this.state.book.owner.username}
                </Link>
              </dd>
            </dl>

            {this.context.user ? (
              <div className="buttons">
                {/* To non-owner: Show "Add To Basket" Button */}
                {!this.context
                  .getBasket()
                  .includes(this.props.match.params.id) ? (
                  <button className="button" onClick={this.onAddToBasket}>
                    Add To Basket
                  </button>
                ) : (
                  <button className="button" onClick={this.onRemoveFromBasket}>
                    Remove from Basket
                  </button>
                )}
                {/* To owner: Show "Add To Basket"" and "Delete" Buttons */}
                {this.context.user.userId === this.state.book.ownerId ? (
                  <>
                    <button className="button" onClick={this.onDelete}>
                      Delete
                    </button>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {/* show trade requests that include this book. pass 'bookId' */}
        <BookTradeRequests bookId={this.props.match.params.id} />
      </div>
    );
  }
}

export { BookDetails };
