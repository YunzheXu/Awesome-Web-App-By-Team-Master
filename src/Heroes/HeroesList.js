import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  ListGroup,
  ListGroupItem
} from "react-bootstrap"
import "./heroesPage.css"

class HeroesList extends Component {
  render() {
    const { hero } = this.props;
    if (hero.length === 0) {
      return <p>No hero yet!</p>;
    }

    const heroDisplays = hero.map(hero => {
      const heroName = `${hero.localized_name}`;
      const id = `${hero.id}`;
      const picture = (
        <img class='img'
        src={`https://api.opendota.com${hero.img}`}
        alt={hero.localized_name}
        />
       ) ;
      
      return (
        <div className="col-sm-4 col-md-3 col-lg-2" >
          <Link to={`/heroes/${id}`}>
            {picture}
          </Link> 
          <h5>{heroName}</h5>
        </div>
      );
    });

    return (
      <section>
        <div className="row">
          <div className="heroesContainer">
            <div className="row">{heroDisplays}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default HeroesList;