import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './myCss.css'
import axios from "axios";
import {  
Nav, Navbar, NavItem, NavDropdown, MenuItem,
} from 'react-bootstrap'

class App extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
      heroList: [],
    };
  }

  async getHeroes() {
    try {
      const response = await axios.get(`https://api.opendota.com/api/heroStats`);
      await this.setState({ heroList: response.data });
    } catch(e) {
      alert(e);
    }
  }

  async componentDidMount() {
    await this.getHeroes();
  }


  render() {

    if (this.state.heroList.length === 0) {
      return <small>No hero yet!</small>;
    }

    const heroDisplays = this.state.heroList.map((hero) => {

      const picture = (
        
          <img class='img'
            src={`https://api.opendota.com${hero.img}`}
            alt={hero.localized_name}
          />
      
       );
      
      return (

        <div className="col-sm-6 col-md-2">

          {picture}
          <h3>{hero.localized_name}</h3>  
          <p><b>#{hero.id}</b></p>  

        </div>
      );
            
    });

    return (
      <div className="App">
        <header >
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
              <a href="#"><img src='http://cdn.dota2.com/apps/dota2/images/nav/logo.png'  alt="logo" /></a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Sign in</NavItem>
                <NavItem eventKey={2} href="#">Sign up</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          

          
        </header>

        <div class='cover'>
          <img src='http://cdn.dota2.com/apps/dota2/images/blogfiles/bg_five_heroes.jpg' alt='cover' width='100%'/> 
        </div>

        <div>
          {heroDisplays}
        </div>

      </div>
    );
  }
}

export default App;
