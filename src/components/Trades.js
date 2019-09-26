import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/globalContext";

class Trades extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <div>Trades</div>;
  }
}

export { Trades };
