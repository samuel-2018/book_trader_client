import React, { useContext } from "react";
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
    <section className="tcs-container" key={`request-${requestId}`}>
      <div className="tcs__header">
        <i className="tcs__header__img fas fa-user-circle"></i>

        <p className="tcs__header__txt">{requester.username}</p>
      </div>

      <div className="tcs__main tcs__main--right">
        <div className="tcs__main__content">
          <div className="tcs__main__content__column">
            <h3 className="tcs-text" role="heading">
              Wants
            </h3>
            {/* Books List */}
            <div>
              {takeBooksRequest.map(book => {
                return (
                  <Book
                    key={`book-${book.bookId}request-${requestId}`}
                    bookData={book}
                    // transactionId={requestId}
                  />
                );
              })}
            </div>
          </div>

          <div className="tcs__main__content__column">
            <h3 className="tcs-text" role="heading">
              Offers
            </h3>
            {/* Books List */}
            <div>
              {giveBooksRequest.map(book => {
                return (
                  <Book
                    key={`book-${book.bookId}request-${requestId}`}
                    bookData={book}
                    // transactionId={requestId}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="tcs__main__buttons">
          {/* To requester: Show "Cancel Request" Button */}
          {currentUserId === requesterId ? (
            <button className="button button-full" onClick={onDeleteRequest}>
              Cancel Request
            </button>
          ) : (
            ""
          )}
          {/* To requestee: Show "Accept" and "Reject" Buttons */}
          {currentUserId === requesteeId ? (
            <>
              <button className="button button-half" onClick={onAccept}>
                Accept
              </button>
              <button className="button button-half" onClick={onDeleteRequest}>
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
