import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import {
  Grid, Row, Col, Nav, Navbar, NavItem, Button
} from "react-bootstrap"
import "./App.css";
import Heroes from "./Heroes";
import SignUp from "./SignUp";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSignInModal: false,
      showSingUpModal: false,
    };
  }  
  /*
  //sign in
  openSignIn() {
    this.setState({showSignInModal: true});
  }

  closeSignIn() {
    this.setState({showSignInModal: false});
  }*/

  //sign up
  openSignUp() {
    this.setState({showSignUpModal: true});
  }

  closeSignUp() {
    this.setState({showSignUpModal: false});
  }

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
                <NavItem eventKey={1} href="#" onClick={this.openSignIn}>Sign in</NavItem>
                <NavItem eventKey={2} href="/Sign-up" onClick={this.openSignUp}>Sign up</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <Grid>
          <Row>
            <div>
            <NavLink to={`/`} className="nav-link">Home</NavLink>
            <NavLink to={`/heroes/`} className="nav-link">Heroes</NavLink>
            </div>
          </Row>
        </Grid>
          <div className="App-body">
            <Switch>
              <Route path="/heroes" component={Heroes} />
              <Route path="/Sign-up" component={SignUp}/>
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