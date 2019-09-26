import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";
import { sendRequest } from "../helpers/sendRequest";
import { Book } from "./Book";

export const Request = props => {
  const context = useContext(Context);
  const {
    requestId,
    requesterId,
    requesteeId,
    requester,
    giveBooksRequest,
    takeBooksRequest
  } = props.requestData;
  const { currentUserId, reloadCb, renderedByThis } = props;

  // Same for "Cancel Request" and "Reject"
  const onDeleteRequest = async () => {
    try {
      // Get user auth info
      const { username, password } = await context.authenticatedUser;

      // Delete request from database
      await sendRequest({
        url: `/requests/${requestId}`,
        method: "DELETE",
        username,
        password
      });

      // Caller needs to make API request for new data
      reloadCb();
    } catch (error) {
      // 'renderedByThis' is from the component using Request.
      // It provides handleError with location/history.
      context.handleError.call(renderedByThis, { error });
    }
  };

  const onAccept = async () => {
    try {
      // Get user auth info
      const { username, password } = await context.authenticatedUser;

      // Send accept request to database
      await sendRequest({
        url: `/requests/accept/${requestId}`,
        method: "DELETE",
        username,
        password
      });

      // Caller needs to make API request for new data
      reloadCb();
    } catch (error) {
      // 'renderedByThis' is from the component using Request.
      // It provides handleError with location/history.
      context.handleError.call(renderedByThis, { error });
    }
  };

  return (
    <section className="request" key={`request-${requestId}`}>
      <div className="request__requester">
        <i className="request__requester__picture fas fa-user-circle"></i>
        <p className="request__requester__username">{requester.username}</p>
      </div>
      <div className="request__body">
        <div className="request__body__wants">
          <h3>Wants</h3>
          {/* Books List */}
          <div>
            {takeBooksRequest.map(book => {
              return (
                <Book
                  key={`book-${book.bookId}request-${requestId}`}
                  bookData={book}
                />
              );
            })}
          </div>
        </div>
        <div className="request__body__offers">
          <h3>Offers</h3>
          {/* Books List */}
          <div>
            {giveBooksRequest.map(book => {
              return (
                <Book
                  key={`book-${book.bookId}request-${requestId}`}
                  bookData={book}
                />
              );
            })}
          </div>
        </div>
        <div className="buttons">
          {/* To requester: Show "Cancel Request" Button */}
          {currentUserId === requesterId ? (
            <button className="button button_full" onClick={onDeleteRequest}>
              Cancel Request
            </button>
          ) : (
            ""
          )}
          {/* To requestee: Show "Accept" and "Reject" Buttons */}
          {currentUserId === requesteeId ? (
            <>
              <button className="button button_half" onClick={onAccept}>
                Accept
              </button>
              <button className="button button_half" onClick={onDeleteRequest}>
                Reject
              </button>{" "}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
