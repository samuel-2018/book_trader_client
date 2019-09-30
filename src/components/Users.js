import React from "react";
// import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";
import { User } from "./User";

class Users extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentDidMount() {
    // Calls API, updates state with user data.
    // (Updating state must be done outside of render.)
    (() => {
      this.context
        .sendRequest({ url: "/users/all", method: "GET" })
        .then(result => {
          // Stores data in state.
          this.setState({
            users: result.data
          });
        })
        .catch(error => {
          this.context.handleError.call(this, { error });
        });
    })();
  }

  render() {
    return (
      <div className="bounds-content">
        {/* Page Title */}
        <div className="page-title">
          <h1>Users</h1>
        </div>

        {/* User List */}
        <div className="page-body two-column-wrapper">
          {this.state.users.map(user => {
            return <User key={`user-${user.userId}`} userData={user} />;
          })}
        </div>
      </div>
    );
  }
}

export { Users };
