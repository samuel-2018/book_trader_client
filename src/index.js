import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, withRouter } from "react-router-dom";
import { App } from "./components/App";
import { Provider } from "./contexts/globalContext";

// Gives provider access to history and location
const ProviderWithRouter = withRouter(Provider);

ReactDOM.render(
  <BrowserRouter>
    <ProviderWithRouter>
      <App />
    </ProviderWithRouter>
  </BrowserRouter>,
  document.getElementById("root")
);
