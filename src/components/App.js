import { Context } from "../contexts/globalContext";
import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

//Components
import { Header } from "./Header";
import { SignOut } from "./SignOut";
import { Books } from "./Books";
import { BasketWithPR } from "./Basket";
import { BookDetails } from "./BookDetails";
import { SignUp } from "./SignUp";
import { NewBookWithPR } from "./NewBook";
import { Profile } from "./Profile";
import { Requests } from "./Requests";
import { UserBooks } from "./UserBooks";
import { SignIn } from "./SignIn";
import { Trades } from "./Trades";
import { Users } from "./Users";
import { NotFound } from "./NotFound";
import { Forbidden } from "./Forbidden";
import { UnhandledError } from "./UnhandledError";

const HeaderWithRouter = withRouter(Header);

class App extends React.Component {
  static contextType = Context;
  componentDidMount() {
    this.context.onLoad();
  }

  render() {
    return (
      <div className="App">
        <HeaderWithRouter />
        <Switch>
          <Redirect exact path="/" to="/books" />
          <Route exact path="/books" component={Books} />
          <Route exact path="/basket" component={BasketWithPR} />
          {/* A unique key is required to create a new component instance if component is already mounted. */}
          <Route
            exact
            path="/books/:id"
            render={props => (
              <BookDetails key={props.match.params.id} {...props} />
            )}
          />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/newbook" component={NewBookWithPR} />
          <Route exact path="/users/:id" component={Profile} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/requests" component={Requests} />
          <Route exact path="/trades" component={Trades} />
          <Route exact path="/books/owner/:id" component={UserBooks} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signout" component={SignOut} />
          <Route exact path="/notfound" component={NotFound} />
          <Route exact path="/forbidden" component={Forbidden} />
          <Route exact path="/error" component={UnhandledError} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export { App };
