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
        <h1 className="header--logo">
          <Link to={{ pathname: `/books` }}>Book Trader</Link>
        </h1>
        {/* Main Nav */}
        <nav className="main-nav">
          {/* Is user authenticated? Is user data ready? */}
          {!!context.authenticatedUser && !!context.user ? (
            // Yes, display welcome message and "Sign Out" button.
            <>
              <div className="main-nav__account">
                <span>
                  Welcome,{" "}
                  {context.user.firstName + " " + context.user.lastName}!
                </span>
                <Link
                  to={{
                    pathname: `/signout`,
                    state: { from: location }
                  }}
                  className="signout"
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
                  className="basket"
                >
                  <i className="profile fas fa-user"></i>
                </Link>
                {/* Basket */}
                <Link
                  to={{
                    pathname: `/basket`,
                    state: { from: location }
                  }}
                  className="basket"
                >
                  <i className="basket fas fa-shopping-basket"></i>
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
                className="signup"
              >
                Sign Up
              </Link>
              <Link
                to={{
                  pathname: `/signin`,
                  state: { from: location }
                }}
                className="signin"
              >
                Sign In
              </Link>
            </div>
          )}
        </nav>
        {/* Secondary Nav */}
        <nav className="secondary-nav">
          <ul className="secondary-nav__pages">
            <li className="nav-item">
              <Link
                to={{
                  pathname: `/books`,
                  state: { from: location }
                }}
                className="nav-link"
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
                className="nav-link"
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
                className="nav-link"
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
                className="nav-link"
              >
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export { Header };
