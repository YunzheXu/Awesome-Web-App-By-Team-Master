import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HeroesPage from "./HeroesPage";
import SingleHero from "./SingleHero";


class Pokemon extends Component {

  render() {
    const { match } = this.props;
    const { url } = match;
//alert(url);
    return (
      <div className="row">
        <div className="col-md-12 ">
          <Switch>
            <Route path={`${url}/page/:page`} component={HeroesPage} />
            <Route path={`${url}/:id`} component={SingleHero } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Hero;