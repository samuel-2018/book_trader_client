import React from "react";
import { Context } from "../contexts/globalContext";

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

    console.log("form submit pressed");

    try {
      await this.context.onSignIn({
        username: this.state.username,
        password: this.state.password
      });

      // Upon successful login, goes to previous page.
      if (this.props.location.state.from.pathname !== "/signin") {
        // last page was signin, so go to main page
        this.props.history.push(this.props.location.state.from.pathname);
      } else {
        this.props.history.push("/books");
      }
    } catch (error) {
      // go to previous page
      this.setState({ showSignInError: true });
    }
  };

  onCancel = () => {
    this.props.history.push("/books");
  };

  render() {
    return (
      <div className="bounds-content">
        {/* Page Title */}
        <div className="page-title">
          <h1>Sign In</h1>
        </div>

        {/* Sign In Error */}
        {this.state.showSignInError ? (
          <div>
            <h2 className="error error__title">Unsuccessful Sign-in</h2>
            <div className="error error__list ">
              <ul>
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
          className="text-primary font-primary"
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
          <button type="submit" className="button">
            Submit
          </button>
          <button onClick={this.onCancel} className="button">
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export { SignIn };
