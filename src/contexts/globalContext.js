import { sendRequest } from "../helpers/sendRequest";
import { handleError } from "../helpers/handleError";
import { validationMessages } from "../helpers/validationMessages";
import Cookies from "js-cookie";
import React from "react";
const Context = React.createContext();

// Provider has access to history and location (wrapped withRouter)

class Provider extends React.Component {
  constructor() {
    super();
    this.state = {
      // Stores username and password.
      authenticatedUser: null,
      // Stores user info: userId, firstName, lastName, and username.
      // (Must default to 'null' for value checking elsewhere.)
      user: null,
      // bookId #s
      basket: []
    };
  }

  // TRADING BASKET HELPERS

  getBasket = () => {
    return this.state.basket;
  };

  onAddToBasket = ({ bookId }) => {
    this.setState(prevState => {
      return { basket: [...prevState.basket, bookId] };
    });
  };

  onRemoveFromBasket = ({ bookId }) => {
    this.setState(prevState => {
      const reducedBasket = prevState.basket.filter(number => {
        // (Basket sends int, Books sends string)
        return number !== bookId.toString();
      });
      return { basket: reducedBasket };
    });
  };

  onEmptyBasket = () => {
    this.setState({ basket: [], requesteeId: null });
  };

  // USER ACCOUNT HELPERS

  getCookies = () => {
    return Cookies.getJSON("authenticatedUser") || null;
  };

  setCookies = ({ username, password }) => {
    // JavaScript Cookie: https://github.com/js-cookie/js-cookie
    // Sets cookie for authentication.
    Cookies.set("authenticatedUser", { username, password }, { expires: 1 });
  };

  // Set user in state
  setUserLocal = ({ user }) => {
    this.setState({ user });
  };

  // Get user from state
  getUserLocal = () => {
    return this.state.user;
  };

  // Get user by calling the API
  getUserAPI = async ({ username, password }) => {
    try {
      const result = await sendRequest({
        url: "/users",
        method: "GET",
        username,
        password
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  };

  // Get user from state
  getAuthUserLocal = () => {
    return this.state.authenticatedUser;
  };

  // Set user in state
  setAuthUserLocal = () => {
    this.setState({
      authenticatedUser: this.getCookies()
    });
  };

  onSignUp = async ({ formDataJS }) => {
    // Create new user
    await sendRequest({
      url: "/users",
      method: "POST",
      data: formDataJS
    });

    this.onSignIn({
      username: formDataJS.username,
      password: formDataJS.password
    });

    // Caller handles errors.
  };

  onProfileUpdate = async ({ formDataJS }) => {
    const { password, username } = this.getAuthUserLocal();

    // The API requires the password be included in the form.
    formDataJS.password = password;

    // Updates user
    await sendRequest({
      url: `/users/${this.state.user.userId}`,
      method: "PUT",
      data: formDataJS,
      password,
      username
    });

    // Updates cookie and local user data with API data
    await this.onSignIn({ password, username });

    // Caller handles errors.
  };

  onSignIn = async ({ username, password }) => {
    // try {
    // Get user data from API
    const user = await this.getUserAPI({ username, password });
    // Set cookie
    this.setCookies({
      username: username,
      password: password
    });
    // Store cookie in state
    this.setAuthUserLocal();

    // Store user data in state
    this.setUserLocal({ user });

    // Caller handles errors.
    // } catch (error) {
    //   console.log(error);

    //   throw error;
    // }
  };

  onSignOut = () => {
    Cookies.remove("authenticatedUser");
    this.setUserLocal({ user: null });
    this.setAuthUserLocal({ authenticatedUser: null });
  };

  // Called by App.js on componentDidMount.
  // Looks for cookies, logs user in.
  onLoad = async () => {
    try {
      const userAuth = this.getCookies();
      if (userAuth) {
        this.onSignIn(userAuth);
      }
    } catch (error) {
      handleError.call(this, { error });
    }
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          // helper functions
          sendRequest,
          handleError,
          validationMessages,
          // Trading Basket helpers
          getBasket: this.getBasket,
          onAddToBasket: this.onAddToBasket,
          onRemoveFromBasket: this.onRemoveFromBasket,
          onEmptyBasket: this.onEmptyBasket,

          // User account helpers
          onSignUp: this.onSignUp,
          onSignIn: this.onSignIn,
          onSignOut: this.onSignOut,
          onProfileUpdate: this.onProfileUpdate,
          onLoad: this.onLoad
        }}
      >
        {/* Allows rendering of all nested components. */}
        {this.props.children}
      </Context.Provider>
    );
  }
}

// Note: 'Context' itself must imported in any
// file that wants to access context.
export { Provider, Context };
