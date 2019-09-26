import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";

class SignIn extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
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
      this.props.history.push(this.props.location.state.from.pathname);
    } catch (error) {
      this.context.handleError.call(this, { error });
    }
  };

  onCancel = () => {
    this.props.history.push("/books");
  };

  render() {
    return (
      <>
        {/* Page Title */}
        <div className="page-title">
          <h1>Sign In</h1>
        </div>

        {/* Form */}
        <form onSubmit={this.onFormSubmit}>
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
          <button type="submit">Submit</button>
          <button onClick={this.onCancel}>Cancel</button>
        </form>
      </>
    );
  }
}

export { SignIn };
