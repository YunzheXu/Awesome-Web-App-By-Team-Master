import React, { Component } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HeroesList from "./HeroesList";
import { Grid, Row, Col, Button, FormControl, FormGroup, InputGroup } from "react-bootstrap"


class HeroesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroesList: []
    };
  }

  async loadHeroesList() {
    const url = `heroStats`;
    const response = await axiosInstance.get(url);

    const resultList = response.data;
    this.setState({ 
      heroesList: resultList 
    });
  }
  
  componentWillMount() {
    this.loadHeroesList();
  }


  render() {
    //alert("Hello -- ");

    return (
      <div className="heroesList">
        <Grid>
          <Row>
            <div className="search-bar">
              <FormGroup>
                <InputGroup>
                  <FormControl type="text" />
                  <InputGroup.Button>
                    <Button>Go!</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </div>
          </Row>
          <HeroesList hero={this.state.heroesList} />
        </Grid>
      </div>
    );
  }
}
export default HeroesPage;
