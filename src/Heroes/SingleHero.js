import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {ListGroup, ListGroupItem, Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import "./singleHero.css"


class SingleHero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: undefined,
      loading: false,
      error: false
    };
  }

  async loadHeroById(heroId) {
    try {
      this.setState({ loading: true });
      const url = `heroStats`;
      const response = await axiosInstance.get(url);
      var heroes = response.data;
      var id = parseInt(heroId);
      var index;
      (async function getIndex() {
        heroes.forEach(function(element) {
          if (element.id === id) {
            index = heroes.indexOf(element);
          }
        });
      })();

      var hero = heroes[index];
      this.setState({ loading: false, hero, error: false});
    } catch (e) {
      this.setState({ 
        loading: false ,
        error: true
      });
    }
  }

  async componentDidMount() {
    const heroId = this.props.match.params.id;
    await this.loadHeroById(heroId);
  }

  async componentWillReceiveProps(nextProps) {
    const heroId = nextProps.match.params.id;
    const oldHeroId = this.props.match.params.id;

    if (heroId !== oldHeroId) {
      await this.loadHeroById(heroId);
    }
  }

  render() {
    let body = null;
    let chart = null;
   // alert(this.state.error );
    if (this.state.error === true) {
      return <Redirect to="/error/" />
    }

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.hero) {
      const url = this.props.match.url;
      const hero = this.state.hero;
      var chartdata = [['Rank', 'Winrate(%)']];
      for (let rank = 1000; rank <= 5000; rank += 1000) {
        let win = rank.toString() + "_win";
        let pick = rank.toString() + "_pick";
        let winrate = (hero[win] / hero[pick]);
        winrate = parseFloat((winrate * 100).toFixed(2));
        chartdata.push([rank, winrate]);
      }
     


      body = (
        <div>
          <Switch>
            <Route
              path={url}
                render={() => {
                  return  <div>
                            <Grid className="hero-template">
                              <Row className="hero-header">
                                  <img className='hero-img'
                                  src={`https://api.opendota.com${hero.img}`}
                                  alt={hero.localized_name}
                                  />
                                  <h1 className="hero-name">{hero.localized_name}</h1>
                                  <div className="hero-info">Attack type: {hero.attack_type}</div>
                                  <div className="hero-info">Roles: {hero.roles}</div>
                              </Row>

                              <Row>
                                <div className="menu-header">
                                  <h2>Stat</h2>
                                </div>
                              </Row>

                              <Row>
                                <div className="content">
                                  <Row>
                                    <Col xs={12} md={3} >
                                      <ul>
                                        <li>base health: {hero.base_health}</li>
                                        <li>base health regen: {hero.base_health_regen}</li>
                                        <li>base mana: {hero.base_mana}</li>
                                        <li>base mana regen: {hero.base_mana_regen}</li>
                                      </ul>
                                    </Col>
                                    <Col xs={12} md={3} >
                                      <ul>
                                        <li>base armor: {hero.base_armor}</li>
                                        <li>base mr: {hero.base_mr}</li>
                                        <li>base attack min: {hero.base_attack_min}</li>
                                        <li>base attack max: {hero.base_attack_max}</li>
                                      </ul>
                                    </Col>
                                  </Row>
                                </div>
                              </Row>

                              <Row>
                                <div className="menu-header">
                                  <h2>Winrate</h2>
                                </div>
                              </Row>

                              <Row>
                                <div className="content">
                                  <Row>
                                    <Col xs={12} md={3} >
                                      <ul>
                                        <li>2000 pick: {hero['2000_pick']}</li>
                                        <li>2000 win: {hero['2000_win']}</li>
                                        <li>3000 pick: {hero['3000_pick']}</li>
                                        <li>3000 win: {hero['3000_win']}</li>
                                      </ul>
                                    </Col>
                                    <Col xs={12} md={3} >
                                      <ul>
                                        <li>4000 pick: {hero['4000_pick']}</li>
                                        <li>4000 win: {hero['4000_win']}</li>
                                        <li>5000 pick: {hero['5000_pick']}</li>
                                        <li>5000 win: {hero['5000_win']}</li>
                                      </ul>
                                    </Col>
                                    <Col xs={12} md={3} >
                                      
                                    </Col>
                                  </Row>
                                </div>
                              </Row>

                              <Row>
                                <div className="menu-header">
                                  <h2>Guides</h2>
                                </div>
                              </Row>

                              <Row>
                                <div className="content">
                                  <ul>
                                    <li><a>Guide1</a></li>
                                    <li><a>Guide2</a></li>
                                    <li><a>Guide3</a></li>
                                    <li><a>Guide4</a></li>
                                  </ul>
                                </div>
                              </Row>
                              
                              <Row>
                                <div className="guide-writting">
                                  <form>
                                    <FormGroup >
                                      <ControlLabel>Hero Guide Title</ControlLabel>
                                      <FormControl type="text" placeholder="Your guide's title" />
                                    </FormGroup>
                                    <FormGroup controlId="formControlsTextarea" >
                                      <ControlLabel>Hero Guide Content</ControlLabel>
                                      <FormControl style={{height: '200px'}} componentClass="textarea" placeholder="Write your guide here!" />
                                    </FormGroup>
                                    <Button type="submit">
                                      Submit
                                    </Button>
                                  </form>
                                </div>
                              </Row>
                            </Grid>
                          </div>;
                }}
            />  
          </Switch>
        </div>
      );
    } else {
      body = <div />;
    }

    return <div className="single-hero-page">{body}</div>;
  }
}

export default SingleHero;