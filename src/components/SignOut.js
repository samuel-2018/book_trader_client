import React, { useContext } from "react";
import { Context } from "../contexts/globalContext";

const SignOut = props => {
  const context = useContext(Context);
  context.onSignOut();
  props.history.replace("/books");
  return null;
};

export { SignOut };
