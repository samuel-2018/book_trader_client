import React from "react";
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

  onClickNew = () => {
    this.props.history.push("/newbook");
  };

  getRequests(requestList) {
    return requestList.length ? (
      requestList.map(request => {
        return (
          <Request
            key={`request-${request.requestId}`}
            requestData={request}
            // If user is not signed in, set value to null.
            currentUserId={this.context.user ? this.context.user.userId : null}
            reloadCb={this.reloadCb}
            renderedByThis={this}
          />
        );
      })
    ) : (
      <div className="tcs-container">
        <div className="tcs-text tcs__main  tcs__main--right">
          Nothing found.
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="page-bounds">
        {/* Section Title */}
        <div className="page-header">
          <h1>Requests</h1>
        </div>
        {this.context.user ? (
          // User signed in

          <div className="page-main">
            {/* Section Sub Title */}
            <div className="page-header">
              <h2>Requests for your books</h2>
            </div>
            {/* Request List */}
            <div className="width-100">
              {this.getRequests(
                this.state.requests.filter(request => {
                  return request.requesteeId === this.context.user.userId;
                })
              )}
            </div>
            {/* Section  Sub Title */}
            <div className="page-header">
              <h2>Your requests for books</h2>
            </div>
            {/* Request List */}
            <div className="width-100">
              {this.getRequests(
                this.state.requests.filter(request => {
                  return request.requesterId === this.context.user.userId;
                })
              )}
            </div>
            {/* Section Sub Title */}
            <div className="page-header">
              <h2>All other requests</h2>
            </div>
            {/* Request List */}

            <div className="width-100">
              {this.getRequests(
                this.state.requests.filter(request => {
                  return (
                    request.requesteeId !== this.context.user.userId &&
                    request.requesterId !== this.context.user.userId
                  );
                })
              )}
            </div>
          </div>
        ) : (
          // User not signed in
          // Request List
          <div className="page-main">
            {this.getRequests(this.state.requests)}
          </div>
        )}

        {/* Create New Book Button */}
        {/* <button className="button" onClick={this.onClickNew}>
          <i className="fas fa-plus"></i> Create New Book
        </button> */}
      </div>
    );
  }
}

export { Requests };
