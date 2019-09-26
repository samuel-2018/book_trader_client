import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";
import { Request } from "./Request";

class Requests extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = { requests: [] };
  }

  componentDidMount() {
    // Calls API, updates state with request data.
    // (Updating state must be done outside of render.)
    this.loadRequests();
  }

  loadRequests = () => {
    this.context
      .sendRequest({ url: "/requests", method: "GET" })
      .then(result => {
        // Stores data in state.
        this.setState({
          requests: result.data
        });
      })
      .catch(error => {
        this.context.handleError.call(this, { error });
      });
  };

  // Reload requests
  // (used when a request is deleted)
  reloadCb = () => {
    this.loadRequests();
  };

  render() {
    return (
      <>
        {this.context.user ? (
          // User signed in
          <>
            {/* Section Title */}
            <div className="page-title">
              <h1>Requests for your books</h1>
            </div>
            {/* Books List */}
            <div>
              {this.state.requests
                .filter(request => {
                  return request.requesteeId === this.context.user.userId;
                })
                .map(request => {
                  return (
                    <Request
                      key={`request-${request.requestId}`}
                      requestData={request}
                      currentUserId={this.context.user.userId}
                      reloadCb={this.reloadCb}
                      renderedByThis={this}
                    />
                  );
                })}
            </div>
            {/* Section Title */}
            <div className="page-title">
              <h1>Your requests for books</h1>
            </div>
            {/* Books List */}
            <div>
              {this.state.requests
                .filter(request => {
                  return request.requesterId === this.context.user.userId;
                })
                .map(request => {
                  return (
                    <Request
                      key={`request-${request.requestId}`}
                      requestData={request}
                      currentUserId={this.context.user.userId}
                      reloadCb={this.reloadCb}
                      renderedByThis={this}
                    />
                  );
                })}
            </div>
            {/* Section Title */}
            <div className="page-title">
              <h1>All other requests</h1>
              {/* Books List */}
              <div>
                {this.state.requests
                  .filter(request => {
                    return (
                      request.requesteeId !== this.context.user.userId &&
                      request.requesterId !== this.context.user.userId
                    );
                  })
                  .map(request => {
                    return (
                      <Request
                        key={`request-${request.requestId}`}
                        requestData={request}
                        currentUserId={this.context.user.userId}
                        reloadCb={this.reloadCb}
                        renderedByThis={this}
                      />
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          // User not signed in
          // Books List
          <div>
            {this.state.requests.map(request => {
              return (
                <Request
                  key={`request-${request.requestId}`}
                  requestData={request}
                  currentUserId={null}
                  reloadCb={this.reloadCb}
                  renderedByThis={this}
                />
              );
            })}
          </div>
        )}

        {/* Create New Book Button */}
        <div className="button">
          <Link
            to={{
              pathname: `/newbook`,
              state: { from: this.props.location }
            }}
          >
            <h3>
              <i className="fas fa-plus"></i>
              Create New Book
            </h3>
          </Link>
        </div>
      </>
    );
  }
}

export { Requests };
