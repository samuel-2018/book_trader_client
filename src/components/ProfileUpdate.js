import React from "react";
import { Context } from "../contexts/globalContext";
import DocumentTitle from "react-document-title";
import { PrivateRoute } from "./PrivateRoute";

class ProfileUpdate extends React.Component {
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
      email: "",

      validationErrors: null
    };
  }
  componentDidMount() {
    // Retrieves user info from global state.
    // Enables form to be filled with current profile info.
    this.setState({
      ...this.context.user
    });
  }

  onFormSubmit = async event => {
    event.preventDefault();
    try {
      const formDataJS = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        country: this.state.country,
        state: this.state.state,
        city: this.state.city,
        email: this.state.email
      };

      await this.context.onProfileUpdate({ formDataJS });

      // Upon successful update, goes to profile page.
      this.props.history.push(`/users/${this.props.match.params.id}`);
    } catch (error) {
      this.context.handleError.call(this, { error });
    }
  };

  onCancel = () => {
    this.props.history.push(`/users/${this.props.match.params.id}`);
  };

  render() {
    return (
      <DocumentTitle title="Update Profile - Book Trader">
        <div className="page-bounds" role="main">
          {/* Page Title */}
          <div className="page-header">
            <h1>Update Profile</h1>
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

export { ProfileUpdate };

// Wraps component in HOC,
// restricting page to signed-in users.
export const ProfileUpdateWithPR = PrivateRoute(ProfileUpdate);
