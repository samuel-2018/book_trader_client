import React from "react";
import { Context } from "../contexts/globalContext";
import { Book } from "./Book";
import { PrivateRoute } from "./PrivateRoute";
import DocumentTitle from "react-document-title";

class Basket extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = {
      takeBooks: [],
      giveBooks: [],
      // Each trade request can only be for books from one other user
      isOneTrader: true,
      // Trade must have at least one book to give and one to take
      isRealTrade: true
    };
  }

  componentDidMount() {
    // Calls API, updates state with book data.
    // (Updating state must be done outside of render.)
    this.loadBooks();
  }

  loadBooks = async () => {
    try {
      // Get user id
      const { userId } = this.context.user;

      const query = this.context.getBasket();
      if (query.length !== 0) {
        const result = await this.context.sendRequest({
          url: `/books/query/${query}`,
          method: "GET"
        });

        const takeBooks = result.data.filter(book => {
          return book.ownerId !== userId;
        });

        const giveBooks = result.data.filter(book => {
          return book.ownerId === userId;
        });

        // Stores data in state.
        this.setState({
          takeBooks,
          giveBooks
        });
      }
    } catch (error) {
      this.context.handleError.call(this, { error });
    }
  };

  onSubmit = async () => {
    try {
      // Are there both give and take books?
      // Local variable is used for flag (state update is delayed)
      const isRealTrade =
        this.state.takeBooks.length && this.state.giveBooks.length;
      // State is used for rendering error message
      this.setState({
        isRealTrade
      });

      if (isRealTrade) {
        // Get user auth
        const { username, password } = this.context.authenticatedUser;
        // Array of book id #s
        const takeBooksId = this.state.takeBooks.map(book => {
          return book.bookId;
        });
        // Array of book id #s
        const giveBooksId = this.state.giveBooks.map(book => {
          return book.bookId;
        });

        // Request data
        const data = {
          requesteeId: this.state.takeBooks[0].ownerId,
          takeBooksId,
          giveBooksId
        };

        // Only one trader
        const isOneTrader = this.state.takeBooks.every(book => {
          return book.ownerId === this.state.takeBooks[0].ownerId;
        });

        if (isOneTrader) {
          // Reset flag
          this.setState({ isOneTrader: true });
          // Submit request
          await this.context.sendRequest({
            url: "/requests",
            method: "POST",
            username,
            password,
            data
          });
          // Empty basket
          this.context.onEmptyBasket();
          this.setState({ takeBooks: [], giveBooks: [] });
        } else {
          this.setState({ isOneTrader: false });
        }
      }
    } catch (error) {
      this.context.handleError.call(this, { error });
    }
  };

  onGoHome = () => {
    this.props.history.push("/books");
  };

  onRemoveBook = bookId => {
    this.setState(prevState => {
      return {
        // Removes a book from basket
        takeBooks: prevState.takeBooks.filter(book => book.bookId !== bookId),
        giveBooks: prevState.giveBooks.filter(book => book.bookId !== bookId)
      };
    });
    // removes bookId from global state basket
    this.context.onRemoveFromBasket({ bookId });

    // Note: This task could be done without calling setState.
    // Call onRemoveFromBasket and then call loadBooks.
    // But this would result in another API call.
  };

  render() {
    const bookJSX = book => {
      return (
        <div
          className="book-wrapper-for-remove"
          key={`book-${book.bookId}-basket`}
        >
          <Book bookData={book} hideRequests={true} />
          <button
            className="remove-item-btn"
            onClick={() => this.onRemoveBook(book.bookId)}
            aria-label="remove this book from basket"
          >
            <i className="far fa-window-close remove-item-btn_x"></i>
          </button>
        </div>
      );
    };

    return (
      <DocumentTitle title="Basket - Book Trader">
        <div className="page-bounds" role="main">
          {/* Section Title */}

          <div className="page-header">
            <h1>Trading Basket</h1>
          </div>

          <section className="tcs-container">
            <div className="tcs__main tcs__main--center">
              <div className="tcs__main__content">
                <div className="tcs__main__content__column">
                  <h3 className="tcs-text">Books I Want</h3>
                  {/* Books List */}
                  <div>
                    {this.state.takeBooks.map(book => {
                      return bookJSX(book);
                    })}
                  </div>
                </div>

                <div className="tcs__main__content__column">
                  <h3 className="tcs-text">Books I'm Offering</h3>
                  {/* Books List */}
                  <div>
                    {this.state.giveBooks.map(book => {
                      return bookJSX(book);
                    })}
                  </div>
                </div>
              </div>

              {!this.state.isOneTrader ? (
                <div className="tcs__main__messages" role="alert">
                  You can only trade with one person per trade request.
                </div>
              ) : (
                ""
              )}
              {!this.state.isRealTrade ? (
                <div className="tcs__main__messages" role="alert">
                  That's not a fair trade! You must select at least one book
                  that you want and at least one that you will offer.
                </div>
              ) : (
                ""
              )}

              <div className="tcs__main__buttons-half tcs-border--top">
                <button
                  className="button button-half--tcs"
                  onClick={this.onSubmit}
                >
                  Submit
                </button>
                <button
                  className="button button-half--tcs"
                  onClick={this.onGoHome}
                >
                  Home
                </button>
              </div>
            </div>
          </section>
        </div>
      </DocumentTitle>
    );
  }
}

// Wraps component in HOC,
// restricting page to signed-in users.
export const BasketWithPR = PrivateRoute(Basket);
