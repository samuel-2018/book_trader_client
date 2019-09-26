import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";

class Profile extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = {};
  }

  onClickViewBooks = () => {
    this.props.history.push(`/books/owner/${this.props.match.params.id}`);
  };

  render() {
    return (
      <>
        {this.context.user ? (
          <>
            {/* Page Title */}
            <div className="page-title">
              <h1>{this.context.user.username}'s Profile</h1>
            </div>

            <section className="profile">
              <i className="profile__picture fas fa-user-circle"></i>
              <div className="profile__details">
                <p>{`${this.context.user.firstName} ${this.context.user.lastName}`}</p>
                <p>{`${this.context.user.city}, ${this.context.user.state}, ${this.context.user.country}`}</p>
              </div>
            </section>

            <div className="buttons">
              {/* To profile owner: Show "View Your Books" Button */}
              {this.context.user.userId == this.props.match.params.id ? (
                <button className="button" onClick={this.onClickViewBooks}>
                  View Your Books
                </button>
              ) : (
                ""
              )}
              {/* To everyone else: Show "View Username's Books" Button */}
              {this.context.user.userId != this.props.match.params.id ? (
                <>
                  <button className="button" onClick={this.onClickViewBooks}>
                    View {this.context.user.username}'s Books
                  </button>{" "}
                </>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export { Profile };
