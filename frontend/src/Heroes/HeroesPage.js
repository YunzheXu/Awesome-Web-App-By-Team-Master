import React, { Component } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HeroesList from "./HeroesList";
import { Grid, Row, Col, Button, FormControl, FormGroup, InputGroup, Panel, ControlLabel } from "react-bootstrap"


class HeroesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroesList: [],
      open: false,
      searchQueryByType: "",
      searchQueryByRole: "",
      searchQueryByAttackType: ""
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
 
  async gethero(primaryAttr,role,attackType){
    const url = `heroStats`;
    const response = await axiosInstance.get(url);
    const resultList = response.data;
    let list1=[];
    let list2=[];
    let list3=[];
    resultList.map((hero) => {
      if (primaryAttr=="all"||primaryAttr==""||hero.primary_attr == primaryAttr) {
        list1.push(hero);
      }
    });
    list1.map((hero) => {
      if (role=="all"||role==""||hero.roles.indexOf(role) !== -1) {
        list2.push(hero);
      }
    });
    list2.map((hero) => {
      if (attackType=="all"||attackType==""||hero.attack_type == attackType) {
        list3.push(hero);
      }
    });
    this.setState({ heroesList: list3 });
  }


  submitSearchForm(searchQueryByType,searchQueryByRole,searchQueryByAttackType) {
    this.gethero(searchQueryByType,searchQueryByRole,searchQueryByAttackType);
  }
  
  componentWillMount() {
    this.loadHeroesList();
  }


  render() {

    return (
      <div className="heroesList">
        <Grid>
          <Row>
            <div className="search-bar">
              <Button block onClick={() => this.setState({ open: !this.state.open })}>
                Filter
              </Button>
              <Panel collapsible expanded={this.state.open}>
                <form 
                onSubmit={e => {
                  e.preventDefault();
                  this.submitSearchForm(this.state.searchQueryByType,this.state.searchQueryByRole,this.state.searchQueryByAttackType);
                }}>
                <Col md={3}>
                <FormGroup controlId="formControlsSelect">
                  
                  <FormControl componentClass="Select" placeholder="All" 
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ searchQueryByType: e.target.value });
                  }}>
                    <option value="all">ALL</option>                    
                    <option value="str">STRENGTH</option>
                    <option value="agi">AGILITY</option>
                    <option value="int">INTELLIGENCE</option>
                  </FormControl>
                  <ControlLabel>By Type</ControlLabel>
                </FormGroup>
                </Col>
                <Col md={3}>
                <FormGroup controlId="formControlsSelect">
                  
                  <FormControl componentClass="Select" placeholder="All" 
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ searchQueryByRole: e.target.value });
                  }}>
                    <option value="all">ALL</option>
                    <option value="Carry">CARRY</option>
                    <option value="Disabler">DISABLER</option>
                    <option value="Support">SUPPORT</option>
                    <option value="Initiator">INITIATOR</option>
                    <option value="Jungler">JUNGLER</option>
                    <option value="Durable">DURABLE</option>
                    <option value="Nuker">NUKER</option>
                    <option value="Pusher">PUSHER</option>
                    <option value="Escape">ESCAPE</option>
                  </FormControl>
                  <ControlLabel>By Role</ControlLabel>
                </FormGroup>
                </Col>
                <Col md={3}>
                <FormGroup controlId="formControlsSelect">
                
                  <FormControl componentClass="Select" placeholder="All" 
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ searchQueryByAttackType: e.target.value });
                  }}>
                    <option value="all">ALL</option>
                    <option value="Melee">MELEE</option>
                    <option value="Ranged">RANGED</option>
                  </FormControl>
                  <ControlLabel>By AttackType</ControlLabel>
                </FormGroup>
                </Col>
                
                <Button type="submit">
                    Search
                </Button>
                
                </form>
              
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
