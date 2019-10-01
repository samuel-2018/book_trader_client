import React from "react";
import { Context } from "../contexts/globalContext";
import { Book } from "./Book";
import { PrivateRoute } from "./PrivateRoute";

class Basket extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = {
      takeBooks: [],
      giveBooks: [],
      isOneTrader: true,
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
      // local variable is used for flag (state update is delayed)
      const isRealTrade =
        this.state.takeBooks.length && this.state.giveBooks.length;
      // state is used for rendering error message
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

  render() {
    return (
      <div className="page-bounds">
        {/* Section Title */}

        <div className="page-header">
          <h1>Trading Basket</h1>
        </div>

        <section className="page-main tcs-container">
          <div className="tcs__main tcs__main--center">
            <div className="tcs__main__content">
              <div className="tcs__main__content__column">
                <h3 className="tcs-text">Books I Want</h3>
                {/* Books List */}
                <div>
                  {this.state.takeBooks.map(book => {
                    return (
                      <Book
                        key={`book-${book.bookId}-basket`}
                        bookData={book}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="tcs__main__content__column">
                <h3 className="tcs-text">Books I'm Offering</h3>
                {/* Books List */}
                <div>
                  {this.state.giveBooks.map(book => {
                    return (
                      <Book
                        key={`book-${book.bookId}-basket`}
                        bookData={book}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {!this.state.isOneTrader ? (
              <div className="tcs__main__messages">
                You can only trade with one person per trade request.
              </div>
            ) : (
              ""
            )}
            {!this.state.isRealTrade ? (
              <div className="tcs__main__messages">
                That's not a fair trade!
              </div>
            ) : (
              ""
            )}

            <div className="tcs__main__buttons tcs-border--top">
              <button className="button" onClick={this.onSubmit}>
                Submit
              </button>

              <button className="button" onClick={this.onGoHome}>
                Home
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

// Wraps component in HOC,
// restricting page to signed-in users.
export const BasketWithPR = PrivateRoute(Basket);
