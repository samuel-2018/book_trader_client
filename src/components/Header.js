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
    <div className="header">
      <div className="bounds">
        {/* <div className="wrapper-logo-main-nav"> */}
        <h1 className="header--logo">
          <Link to={{ pathname: `/books` }} id="header--logo__link">
            <i className="fas fa-book book-logo"></i>Book Trader
          </Link>
        </h1>
        <div className="wrapper__nav">
          {/* Main Nav */}
          <nav className="main-nav">
            {/* Is user authenticated? Is user data ready? */}
            {!!context.authenticatedUser && !!context.user ? (
              // Yes, display welcome message and "Sign Out" button.
              <>
                <div className="main-nav__account">
                  <span className="nav">
                    Welcome,{" "}
                    {context.user.firstName + " " + context.user.lastName}!
                  </span>
                  <Link
                    to={{
                      pathname: `/signout`,
                      state: { from: location }
                    }}
                    className="signout nav"
                  >
                    Sign Out
                  </Link>
                </div>
                <div className="main-nav__icons">
                  {/* Profile */}
                  <Link
                    to={{
                      pathname: `/users/${context.user.userId}`,
                      state: { from: location }
                    }}
                    className="profile nav"
                  >
                    <i className="profile fas fa-user"></i>
                  </Link>
                  {/* Basket */}
                  <Link
                    to={{
                      pathname: `/basket`,
                      state: { from: location }
                    }}
                    className="basket-nav nav"
                  >
                    <i className="basket-nav fas fa-shopping-basket"></i>
                  </Link>
                </div>
              </>
            ) : (
              // No, display "Sign Up" and "Sign In" buttons.
              <div className="main-nav__account">
                <Link
                  to={{
                    pathname: `/signup`,
                    state: { from: location }
                  }}
                  className="signup nav"
                >
                  Sign Up
                </Link>
                <Link
                  to={{
                    pathname: `/signin`,
                    state: { from: location }
                  }}
                  className="signin nav"
                >
                  Sign In
                </Link>
              </div>
            )}
          </nav>
          {/* </div> */}
          {/* Secondary Nav */}
          <nav className="secondary-nav">
            <ul className="secondary-nav__pages">
              <li className="nav-item">
                <Link
                  to={{
                    pathname: `/books`,
                    state: { from: location }
                  }}
                  className="nav-link nav"
                >
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={{
                    pathname: `/requests`,
                    state: { from: location }
                  }}
                  className="nav-link nav"
                >
                  Requests
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={{
                    pathname: `/trades`,
                    state: { from: location }
                  }}
                  className="nav-link nav"
                >
                  Trades
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={{
                    pathname: `/users`,
                    state: { from: location }
                  }}
                  className="nav-link nav"
                >
                  Users
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
