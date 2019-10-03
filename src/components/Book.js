import React from "react";
import { Link } from "react-router-dom";

export const Book = props => {
  return (
    <Link
      className="link-wrapper link-no-decoration"
      to={{
        pathname: `/books/${props.bookData.bookId}`,
        state: { from: props.location }
      }}
    >
      <div className="book">
        <div className="book__info">
          <p className="book__info__title pad-s">{props.bookData.title}</p>
          <p className="book__info__author pad-s">{props.bookData.author}</p>
          <p className="book__info__owner pad-s">{`From the library of ${props.bookData.owner.username} in ${props.bookData.owner.city}, ${props.bookData.owner.state}, ${props.bookData.owner.country}`}</p>
        </div>

        <div className="book__requests">
          <i
            className="book__requests__icon fas fa-comments pad-s"
            aria-label="requests for this book"
          />

          <div className="book__requests__info">
            <p className="book__requests__count pad-s">
              {props.bookData.takeBooksRequest.length}
            </p>

            <div className="book__requests__usernames">
              {props.bookData.takeBooksRequest.map(request => {
                return (
                  <p
                    className="book__requests__usernames__name pad-s"
                    // key={`book-${props.bookData.bookId}-requester-${request.requesterId}-transactionId-${props.transactionId}`}
                  >
                    {request.requester.username}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
