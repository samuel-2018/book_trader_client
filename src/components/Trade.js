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
    <section className="request">
      <div className="request__requester">
        <i className="request__requester__picture fas fa-exchange-alt"></i>

        <p className="request__requester__username text-primary font-primary">
          {createdAt}
        </p>
      </div>

      <div className="request__body message-box__partual">
        <div className="request__body__wrapper">
          <div className="request__body__wants">
            <h3 className="box-title">{requester.username} Received</h3>
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

          <div className="request__body__offers">
            <h3 className="box-title">{requestee.username} Received</h3>
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
