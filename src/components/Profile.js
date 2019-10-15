import React from "react";
import { Context } from "../contexts/globalContext";
import DocumentTitle from "react-document-title";
import { Link } from "react-router-dom";

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
    // First checks if context is ready,
    // then checks if current user and param
    // ID are the same.

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

  onClickNew = () => {
    this.props.history.push("/newbook");
  };

  render() {
    const profileJSX = () => {
      return (
        <section className="page-main">
          <i className="page-text__jumbo fas fa-user-circle"></i>
          <div className="page-text__large">
            <p>{`${this.state.profile.firstName} ${this.state.profile.lastName}`}</p>
            <p>{`${this.state.profile.city}, ${this.state.profile.state}, ${this.state.profile.country}`}</p>
          </div>
        </section>
      );
    };

    return (
      <DocumentTitle
        title={`${
          Object.keys(this.state.profile).length
            ? this.state.profile.username
            : "Profile Page - Book Trader"
        }'s Profile Page - Book Trader`}
      >
        <>
          {/* Checks for empty object (non-Date obj) */}
          {Object.keys(this.state.profile).length ? (
            <div className="page-bounds" role="main">
              {/* View books button */}

              {/* To profile owner: Show "View Your Books" Button
                   and update profile icon link */}
              {this.context.user &&
              this.context.user.userId ===
                parseInt(this.props.match.params.id) ? (
                <>
                  {/* Page Title */}
                  <div className="page-header">
                    <h1>
                      {" "}
                      Profile{" "}
                      <Link
                        to={{
                          pathname: `/users/${this.context.user.userId}/update`,
                          state: { from: this.location }
                        }}
                        className=""
                      >
                        <i
                          className="fas fa-edit"
                          aria-label="update profile"
                          alt="update profile"
                        ></i>
                      </Link>
                    </h1>
                  </div>

                  {/* Profile */}
                  {profileJSX()}

                  <div className="page__main__buttons-half--together">
                    <button
                      className="button button-half"
                      onClick={this.onClickViewBooks}
                    >
                      View Your Books
                    </button>
                    {/* Create New Book Button */}
                    <button
                      className="button button-half"
                      onClick={this.onClickNew}
                    >
                      <i className="fas fa-plus"></i> Create New Book
                    </button>
                  </div>
                </>
              ) : (
                //To everyone else: Show "View Username's Books" Button
                <>
                  {/* Page Title */}
                  <div className="page-header">
                    <h1>{this.state.profile.username}'s Profile</h1>
                  </div>

                  {/* Profile */}
                  {profileJSX()}

                  <button className="button" onClick={this.onClickViewBooks}>
                    View {this.state.profile.username}'s Books
                  </button>
                </>
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
      </DocumentTitle>
    );
  }
}

export { Profile };
