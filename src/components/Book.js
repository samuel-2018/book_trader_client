import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";

export const Book = props => {
  return (
    <div className="book">
      <Link
        to={{
          pathname: `/books/${props.bookData.bookId}`,
          // TODO test, the book component may need props passed to it.
          state: { from: props.location }
        }}
      >
        <div className="book__info">
          <p className="book__info__title">{props.bookData.title}</p>
          <p className="book__info__author">{props.bookData.author}</p>
          <p className="book__info__owner">{`from ${props.bookData.owner.username} in ${props.bookData.owner.city}, ${props.bookData.owner.state}, ${props.bookData.owner.country}`}</p>
        </div>
        <div className="book__requests">
          <i className="book__requests__icon fas fa-comments" />
          <div className="book__requests__info">
            <p className="book__requests__count">
              {props.bookData.takeBooksRequest.length}
            </p>
            <div className="book__requests__usernames">
              {props.bookData.takeBooksRequest.map(request => {
                return (
                  <p key={`requester-${request.requesterId}`}>
                    {request.requester.username}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
