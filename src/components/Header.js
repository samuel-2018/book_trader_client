import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";

const Header = props => {
  // Sets page title
  document.title = "Book Trader";
  // 'location' is the current route.
  //  Each 'Link' element provides that
  // information to the page followed
  // through the link.
  const context = useContext(Context);
  const { location } = props;

  return (
    <div className="header-container">
      <div className="header-bounds" role="banner">
        {/* <div className="wrapper-logo-main-nav"> */}
        <h1 className="header__logo">
          <Link to={{ pathname: `/books` }} id="header__logo__link">
            <i className="fas fa-book book-logo"></i>
            <span className="logo-text">Book Trader</span>
          </Link>
        </h1>
        <div className="header__main">
          {/* Main Nav */}
          <nav className="header__main__primary-nav">
            {/* Is user authenticated? Is user data ready? */}
            {!!context.authenticatedUser && !!context.user ? (
              // Yes, display welcome message and "Sign Out" button.
              <>
                <div className="nav__account">
                  <span className="nav nav-welcome-msg">
                    Welcome,{" "}
                    {context.user.firstName + " " + context.user.lastName}!
                  </span>
                  <Link
                    to={{
                      pathname: `/signout`,
                      state: { from: location }
                    }}
                    className="nav link"
                  >
                    <div>Sign Out</div>
                  </Link>
                </div>
                <div className="nav__icons">
                  {/* Profile */}
                  <Link
                    to={{
                      pathname: `/users/${context.user.userId}`,
                      state: { from: location }
                    }}
                    className="nav link"
                  >
                    <div className="nav-center">
                      <i
                        className="link fas fa-user"
                        aria-label="user profile"
                        alt="user profile"
                      ></i>
                    </div>
                  </Link>
                  {/* Basket */}
                  <Link
                    to={{
                      pathname: `/basket`,
                      state: { from: location }
                    }}
                    className="nav link"
                  >
                    <div className="nav-center">
                      <i
                        className="link nav__icons__basket fas fa-shopping-basket"
                        aria-label="trade basket"
                        alt="trade basket"
                      ></i>
                    </div>
                  </Link>
                </div>
              </>
            ) : (
              // No, display "Sign Up" and "Sign In" buttons.
              <div className="nav__account">
                <Link
                  to={{
                    pathname: `/signup`,
                    state: { from: location }
                  }}
                  className="nav  link"
                >
                  <div className="nav-center">Sign Up </div>
                </Link>
                <Link
                  to={{
                    pathname: `/signin`,
                    state: { from: location }
                  }}
                  className="nav link"
                >
                  <div className="nav-center">Sign In</div>
                </Link>
              </div>
            )}
          </nav>
          {/* </div> */}
          {/* Secondary Nav */}
          <nav className="header__main__secondary-nav">
            <ul className="nav__pages">
              <li className="nav__pages__page">
                <Link
                  to={{
                    pathname: `/books`,
                    state: { from: location }
                  }}
                  className="nav__pages__page nav link"
                >
                  <div className="nav-center">Books</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={{
                    pathname: `/requests`,
                    state: { from: location }
                  }}
                  className="nav__pages__page nav link"
                >
                  <div className="nav-center">Requests</div>
                </Link>
              </li>
              <li className="nav__pages__page link">
                <Link
                  to={{
                    pathname: `/trades`,
                    state: { from: location }
                  }}
                  className="nav__pages__page nav link"
                >
                  <div className="nav-center">Trades</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={{
                    pathname: `/users`,
                    state: { from: location }
                  }}
                  className="nav__pages__page nav link"
                >
                  <div className="nav-center">Users</div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* end of wrapper__nav */}
      </div>
    </div>
  );
};

export { Header };
