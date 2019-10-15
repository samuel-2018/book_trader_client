import React from "react";
import { Context } from "../contexts/globalContext";
import DocumentTitle from "react-document-title";

class SignUp extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      country: "",
      state: "",
      city: "",
      password: "",
      email: "",
      confirmPassword: "",
      confirmPasswordError: false,
      validationErrors: null
    };
  }

  onFormSubmit = async event => {
    event.preventDefault();

    console.log("form submit pressed");
    try {
      if (this.state.password === this.state.confirmPassword) {
        const formDataJS = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          country: this.state.country,
          state: this.state.state,
          city: this.state.city,
          email: this.state.email,
          password: this.state.password
        };

        await this.context.onSignUp({ formDataJS });

        // Upon successful login, goes to previous page.
        if (
          this.props.location.state.from.pathname !== "/signin" ||
          this.props.location.state.from.pathname !== "/signup"
        ) {
          // Last page was signin, so go to main page
          this.props.history.push(this.props.location.state.from.pathname);
        } else {
          this.props.history.push("/books");
        }
      } else {
        this.setState({ confirmPasswordError: true });
      }
    } catch (error) {
      this.context.handleError.call(this, { error });
    }
  };

  onCancel = () => {
    this.props.history.push("/books");
  };

  render() {
    return (
      <DocumentTitle title="Sign Up - Book Trader">
        <div className="page-bounds" role="main">
          {/* Page Title */}
          <div className="page-header">
            <h1>Sign Up</h1>
          </div>

          {/* Validation Errors */}
          {this.context.validationMessages(this.state.validationErrors)}

          {/* Form */}

          <form
            onSubmit={this.onFormSubmit}
            className="page-text__normal page-main--form"
          >
            <label className="label">
              *First Name <br />
              <input
                type="text"
                value={this.state.firstName}
                onChange={e => this.setState({ firstName: e.target.value })}
                className="input"
              />
            </label>
            <label className="label">
              *Last Name <br />
              <input
                type="text"
                value={this.state.lastName}
                onChange={e => this.setState({ lastName: e.target.value })}
                className="input"
              />
            </label>
            <label className="label">
              City <br />
              <input
                type="text"
                value={this.state.city}
                onChange={e => this.setState({ city: e.target.value })}
                className="input"
              />
            </label>
            <label className="label">
              State <br />
              <input
                type="text"
                value={this.state.state}
                onChange={e => this.setState({ state: e.target.value })}
                className="input"
              />
            </label>
            <label className="label">
              *Country <br />
              <input
                type="text"
                value={this.state.country}
                onChange={e => this.setState({ country: e.target.value })}
                className="input"
              />
            </label>
            <label className="label">
              Email <br />
              <input
                type="text"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                className="input"
              />
            </label>
            <label className="label">
              *Username <br />
              <input
                type="text"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
                className="input"
              />
            </label>
            <label className="label">
              *Password <br />
              <input
                type="text"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                className="input"
              />
            </label>
            <label className="label">
              *Confirm Password <br />
              <input
                type="text"
                value={this.state.confirmPassword}
                onChange={e =>
                  this.setState({ confirmPassword: e.target.value })
                }
                className="input"
              />
              {this.state.confirmPasswordError === false ? (
                ""
              ) : (
                <p className="error error__msg" role="alert">
                  Password must match confirmation.
                </p>
              )}
            </label>
            <div>*Required fields.</div>
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

export { SignUp };
