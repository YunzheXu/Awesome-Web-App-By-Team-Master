import React, { Component } from "react";
import axiosInstance from "../utils/axiosInstance";
import HeroesList from "./HeroesList";
import { Grid, Row, Col, Button, FormControl, FormGroup, InputGroup, Panel, ControlLabel } from "react-bootstrap"


class HeroesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroesList: [],
      open: false
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
          <Row>
            <div className="search-bar">
              <Button block onClick={() => this.setState({ open: !this.state.open })}>
                Filter
              </Button>
              <Panel collapsible expanded={this.state.open}>
                <Col md={3}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Type</ControlLabel>
                  <FormControl componentClass="Select" placeholder="All">
                    <option value="All">All</option>
                    <option value="Str">Str</option>
                    <option value="Agi">Agi</option>
                    <option value="Dex">Dex</option>
                  </FormControl>
                </FormGroup>
                </Col>
              </Panel>
            </div>
          </Row>
          <HeroesList hero={this.state.heroesList} />
        </Grid>
      </div>
    );
  }
}
export default HeroesPage;
