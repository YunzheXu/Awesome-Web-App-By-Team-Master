import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import {
  Grid, Row, Col, Nav, Navbar, NavItem
} from "react-bootstrap"
import "./App.css";
import Heroes from "./Heroes";



class App extends Component {


  render() {
       // alert("Hello -- ");     
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
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Sign in</NavItem>
                <NavItem eventKey={2} href="#">Sign up</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>

          <Link to={`/`}>Home</Link>
          <Link to={`/heroes/`}>Heroes</Link>
   


          <div className="App-body">
            
            <Switch>
              <Route path="/heroes" component={Heroes} />
            </Switch>
          </div>
          <footer>
            Enjoy it!
          </footer>
        </div>
      </Router>
    );
  }
}



export default App;


/**
 * 
 * 
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

        <div className="col-sm-6 col-md-3">
          <h4 class='text'>{hero.id} </h4>
          {picture}
          <h3 class='text'>{hero.localized_name}</h3>  
        </div>
      );
            
    });

    return (
      <div className="App">
        <header >
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
              <a href="#"><img src='http://cdn.dota2.com/apps/dota2/images/nav/logo.png'  alt="logo" height='20px'/></a>
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
          <div class="centered">Dota2 Heroes Guide</div>
        </div>
        <Grid>
          <div>
            {heroDisplays}
          </div>
        </Grid>


      </div>
    );
  }
}
 */