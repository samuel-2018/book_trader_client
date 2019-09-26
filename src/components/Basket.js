import React from "react";
import { Link } from "react-router-dom";
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
      <section className="request">
        <div className="request__body">
          <div className="request__body__wants">
            <h3>Books I Want</h3>
            {/* Books List */}
            <div>
              {this.state.takeBooks.map(book => {
                return (
                  <Book key={`book-${book.bookId}-basket`} bookData={book} />
                );
              })}
            </div>
          </div>
          <div className="request__body__offers">
            <h3>Books I'm Offering</h3>
            {/* Books List */}
            <div>
              {this.state.giveBooks.map(book => {
                return (
                  <Book key={`book-${book.bookId}-basket`} bookData={book} />
                );
              })}
            </div>
          </div>

          {!this.state.isOneTrader ? (
            <div>You can only trade with one person per trade request.</div>
          ) : (
            ""
          )}
          {!this.state.isRealTrade ? <div>That's not a fair trade!</div> : ""}

          <div className="buttons">
            <button className="button" onClick={this.onSubmit}>
              Submit
            </button>

            <button className="button" onClick={this.onGoHome}>
              Home
            </button>
          </div>
        </div>
      </section>
    );
  }
}

// Wraps component in HOC,
// restricting page to signed-in users.
export const BasketWithPR = PrivateRoute(Basket);
