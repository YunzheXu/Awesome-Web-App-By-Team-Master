import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from "react-router-dom";
import {
  Grid, Row, Nav, Navbar, NavItem
} from "react-bootstrap"
import "./App.css";
import Heroes from "./Heroes";
import Home from "./Home";


class App extends Component {

  constructor(props) {
    super(props);
  }  

  render() {     
    return (
      <Router>
        <div className="App">
        <header>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
              <a href="/"><img src='http://cdn.dota2.com/apps/dota2/images/nav/logo.png'  alt="logo" height='20px'/></a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Navbar>
        </header>
        <Grid>
          <Row>
            <div>
            <NavLink to={`/home`} className="nav-link">Home</NavLink>
            <NavLink to={`/heroes/`} className="nav-link">Heroes</NavLink>
            </div>
          </Row>
        </Grid>
          <div className="App-body">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/heroes" component={Heroes} />
              <Redirect from="/" to="/home"/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;




