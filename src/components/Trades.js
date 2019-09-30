import React from "react";
// import { Link } from "react-router-dom";
import { Trade } from "./Trade";
import { Context } from "../contexts/globalContext";

class Trades extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = { trades: [] };
  }
  componentDidMount() {
    // Calls API, updates state with request data.
    // (Updating state must be done outside of render.)
    this.loadTrades();
  }

  loadTrades = () => {
    this.context
      .sendRequest({ url: "/trades", method: "GET" })
      .then(result => {
        // Stores data in state.
        this.setState({
          trades: result.data
        });
      })
      .catch(error => {
        this.context.handleError.call(this, { error });
      });
  };

  getTrades(tradeList) {
    return tradeList.length ? (
      tradeList.map(trade => {
        return <Trade key={`trade-${trade.tradeId}`} tradeData={trade} />;
      })
    ) : (
      <div className="box-title request__body request message-box__partual">
        Nothing Found
      </div>
    );
  }

  render() {
    return (
      <div className="bounds-content">
        {/* Section Title */}
        <div className="page-title">
          <h1>Trades</h1>
        </div>

        <div className="page-body">
          {/* Trade List */}
          <div className="page-body">{this.getTrades(this.state.trades)}</div>
        </div>
      </div>
    );
  }
}

export { Trades };
