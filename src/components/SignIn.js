import React from "react";
import { Context } from "../contexts/globalContext";
import DocumentTitle from "react-document-title";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      showSignInError: false
    };
  }

  onFormSubmit = async event => {
    event.preventDefault();
    try {
      await this.context.onSignIn({
        username: this.state.username,
        password: this.state.password
      });

      // Upon successful login, goes to previous page.
      if (this.props.location.state.from.pathname !== "/signin") {
        // Last page was signin, so go to main page
        this.props.history.push(this.props.location.state.from.pathname);
      } else {
        this.props.history.push("/books");
      }
    } catch (error) {
      // Show sign in error
      this.setState({ showSignInError: true });
    }
  };

  onCancel = () => {
    this.props.history.push("/books");
  };

  render() {
    return (
      <DocumentTitle title="Sign In - Book Trader">
        <div className="page-bounds" role="main">
          {/* Page Title */}
          <div className="page-header">
            <h1>Sign In</h1>
          </div>

          {/* Sign In Error */}
          {this.state.showSignInError ? (
            <div role="alert">
              <h2 className="error error__title">Unsuccessful Sign-in</h2>
              <div className=" ">
                <ul className="no-bull">
                  {/* Displays errors */}
                  <li className="error error__msg">
                    Username or password not found.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Form */}
          <form
            onSubmit={this.onFormSubmit}
            className="page-text__normal page-main--form"
          >
            <label className="label">
              Username <br />
              <input
                type="text"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
                className="input"
              />
            </label>
            <label className="label">
              Password <br />
              <input
                type="text"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                className="input"
              />
            </label>
            <div>
              Don't have an account?{"  "}
              <Link
                to={{
                  pathname: `/signup`,
                  state: { from: this.location }
                }}
                className=""
              >
                Sign up here!
              </Link>
            </div>

            <div className="page__main__buttons-half page-main-border--top">
              <button type="submit" className="button button-half">
                Submit
              </button>
              <button onClick={this.onCancel} className="button button-half">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </DocumentTitle>
    );
  }
}

export { SignIn };
