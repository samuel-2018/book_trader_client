import React from "react";
import { Context } from "../contexts/globalContext";
import { Request } from "./Request";

// All trade request involving one book

class BookTradeRequests extends React.Component {
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
      .sendRequest({
        url: `/requests/book/${this.props.bookId}`,
        method: "GET"
      })
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
        {/* Section Title */}
        <div className="page-title">
          <h1>Trade Requests</h1>
          <h2>that include this book</h2>
        </div>

        {/* Trade Request List */}
        <div>
          {this.state.requests.map(request => {
            return (
              <Request
                key={`request-${request.requestId}`}
                requestData={request}
                currentUserId={
                  this.context.user ? this.context.user.userId : null
                }
                reloadCb={this.reloadCb}
                renderedByThis={this}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export { BookTradeRequests };
