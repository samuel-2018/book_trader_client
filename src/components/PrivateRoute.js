import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../contexts/globalContext";
const Consumer = Context.Consumer;

// HOC
function PrivateRoute(OriginalComponent) {
  return function() {
    return (
      <Consumer>
        {context => {
          return (
            <Route
              render={props =>
                // Is the user signed in?
                context.authenticatedUser ? (
                  // Yes, render requested page.
                  <OriginalComponent context={context} {...props} />
                ) : (
                  // No, redirect to signin.
                  <Redirect
                    to={{
                      pathname: `/signin`,
                      state: { from: props.location }
                    }}
                  />
                )
              }
            />
          );
        }}
      </Consumer>
    );
  };
}

export { PrivateRoute };
