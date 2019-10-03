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
      <h3 className="tcs__header" role="heading">
        <i
          className="tcs__header__img  fas fa-exchange-alt"
          aria-label="trade"
          alt="trade"
        ></i>

        <p className="tcs__header__txt">{createdAt}</p>
      </h3>

      <div className="tcs__main tcs__main--right">
        <div className="tcs__main__content">
          <div className="tcs__main__content__column">
            <h4 className="tcs-text" role="heading">
              {requester.username} Received
            </h4>
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
            <h4 className="tcs-text" role="heading">
              {requestee.username} Received
            </h4>
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
