import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HeroesPage from "./HeroesPage";
import SingleHero from "./SingleHero";

class Heroes extends Component {

  render() {
    const { match } = this.props;
    const { url } = match;
//alert(url);
    return (
      <Switch>
        <Route path={`${url}/:id`} component={SingleHero } />     
        <Route path={`${url}/`} component={HeroesPage} />
      </Switch>
    );
  }
}

export default Heroes;