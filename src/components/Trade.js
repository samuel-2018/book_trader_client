import React from "react";

import { Book } from "./Book";

export const Trade = props => {
  const {
    tradeId,
    requester,
    requestee,
    giveBooksTrade,
    takeBooksTrade,
    createdAt
  } = props.tradeData;

  return (
    // key={`trade-${tradeId}`}
    <section className="tcs-container">
      <div className="tcs__header">
        <i className="tcs__header__img  fas fa-exchange-alt"></i>

        <p className="tcs__header__txt">{createdAt}</p>
      </div>

      <div className="tcs__main tcs__main--right">
        <div className="tcs__main__content">
          <div className="tcs__main__content__column">
            <h3 className="tcs-text">{requester.username} Received</h3>
            {/* Books List */}
            <div>
              {takeBooksTrade.map(book => {
                return (
                  <Book
                    key={`book-${book.bookId}request-${tradeId}`}
                    bookData={book}
                    // transactionId={tradeId}
                  />
                );
              })}
            </div>
          </div>

          <div className="tcs__main__content__column">
            <h3 className="tcs-text">{requestee.username} Received</h3>
            {/* Books List */}
            <div>
              {giveBooksTrade.map(book => {
                return (
                  <Book
                    key={`book-${book.bookId}request-${tradeId}`}
                    bookData={book}
                    // transactionId={tradeId}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
