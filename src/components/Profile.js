import React from "react";
import { Context } from "../contexts/globalContext";

class Profile extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = { profile: {} };
  }

  onClickViewBooks = () => {
    this.props.history.push(`/books/owner/${this.props.match.params.id}`);
  };

  componentDidMount() {
    {
      /* first checks if context is ready,
    then checks if current user and param
    ID are the same. */
    }
    if (
      this.context.user &&
      this.context.user.userId === this.props.match.params.id
    ) {
      this.setState({ profile: this.context.user });
    } else {
      this.context
        .sendRequest({
          url: `/users/${this.props.match.params.id}`,
          method: "GET"
        })
        .then(result => {
          // Stores data in state.
          this.setState({
            profile: result.data
          });
        })
        .catch(error => {
          this.context.handleError.call(this, { error });
        });
    }
  }

  render() {
    return (
      <>
        {/* Checks for empty object (non-Date obj) */}
        {Object.keys(this.state.profile).length ? (
          <div className="page-bounds">
            {/* Page Title */}
            <div className="page-header">
              <h1>{this.state.profile.username}'s Profile</h1>
            </div>

            {/* Profile */}
            <section className="page-main">
              <i className="page-text__jumbo fas fa-user-circle"></i>
              <div className="page-text__large">
                <p>{`${this.state.profile.firstName} ${this.state.profile.lastName}`}</p>
                <p>{`${this.state.profile.city}, ${this.state.profile.state}, ${this.state.profile.country}`}</p>
              </div>
            </section>

            {/* View books button */}

            {/* To profile owner: Show "View Your Books" Button */}
            {this.context.user &&
            this.context.user.userId ===
              parseInt(this.props.match.params.id) ? (
              <button className="button" onClick={this.onClickViewBooks}>
                View Your Books
              </button>
            ) : (
              //To everyone else: Show "View Username's Books" Button
              <button className="button" onClick={this.onClickViewBooks}>
                View {this.state.profile.username}'s Books
              </button>
            )}
          </div>
        ) : (
          <div className="page-bounds">
            <div className="page-header">
              <h1>Loading...</h1>
            </div>
          </div>
        )}
      </>
    );
  }
}

export { Profile };
