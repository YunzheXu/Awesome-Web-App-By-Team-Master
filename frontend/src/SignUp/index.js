import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import HeroesPage from "./HeroesPage";
//import SingleHero from "./SingleHero";
import SignUpPage from "./SignUpPage";


class Heroes extends Component {

  render() {
    const { match } = this.props;
    const { url } = match;
//alert(url);
    return (
      <Switch>
        <Route path={`${url}/`} component={SignUpPage} />
      </Switch>
    );
  }
}

export default Heroes;