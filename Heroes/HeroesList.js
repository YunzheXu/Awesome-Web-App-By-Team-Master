import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  ListGroup,
  ListGroupItem
} from "react-bootstrap"

class HeroesList extends Component {
  render() {
    const { hero } = this.props;
    if (hero.length === 0) {
      return <p>No hero yet!</p>;
    }

    const heroDisplays = hero.map(hero => {
      var url = `${hero.url}`;
    
      return (
        <div className="col-sm-6 col-md-4" key={id}>
            <h1>singleHero</h1>
        </div>
      );
    });

    return (
      <section>
        <div className="row">
          <div className="col-sm-12">
            <div className="row">{heroDisplays}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default PokemonList;