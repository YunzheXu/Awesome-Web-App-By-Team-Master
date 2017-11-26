import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col
} from "react-bootstrap"

class SinglePokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: undefined,
      loading: false,
      error: false
    };
  }

  async loadPokemonById(pokemonId) {
    try {
      this.setState({ loading: true });
      const url = `pokemon/${pokemonId}/`;
      const response = await axiosInstance.get(url);
      const pokemon = response.data;
      this.setState({ loading: false, pokemon, error: false});
    } catch (e) {
      this.setState({ 
        loading: false ,
        error: true
      });
    }
  }

  async componentDidMount() {
    const pokemonId = this.props.match.params.id;
    await this.loadPokemonById(pokemonId);
  }

  async componentWillReceiveProps(nextProps) {
    const pokemonId = nextProps.match.params.id;
    const oldPokemonId = this.props.match.params.id;

    if (pokemonId !== oldPokemonId) {
      await this.loadPokemonById(pokemonId);
    }
  }

  render() {
    let body = null;
   // alert(this.state.error );
    if (this.state.error === true) {
      return <Redirect to="/error/" />
    }

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.pokemon) {
      const url = this.props.match.url;
      var id = this.state.pokemon.id;
      var picId = String("00" + id).slice(-3);
      body = (
        <div>
            <Switch>
              <Route
                  path={url}
                  render={() => {
                      return  <div>
                                <Grid>
                                  <br></br>
                                  <Row>
                                    <Col xs={12} sm={6} md={4}></Col>
                                    <Col xs={12} sm={6} md={4}>
                                      <ListGroup>
                                        <ListGroupItem><img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${picId}.png`} alt={`${picId}`}/></ListGroupItem>
                                        <ListGroupItem header="Id">{this.state.pokemon.id}</ListGroupItem>
                                        <ListGroupItem header="Name">{this.state.pokemon.name}</ListGroupItem>
                                        <ListGroupItem header="Base Experience">{this.state.pokemon.base_experience}</ListGroupItem>
                                        <ListGroupItem header="Height">{this.state.pokemon.height}</ListGroupItem>
                                        <ListGroupItem header="Weight">{this.state.pokemon.weight}</ListGroupItem>
                                      </ListGroup>
                                    </Col>
                                    <Col xs={12} sm={6} md={4}></Col>
                                  </Row>    
                                </Grid>
                              </div>
                      ;
                  }}
                  />  
            </Switch>
        </div>
      );
    } else {
      body = <div />;
    }

    return <div className="single-pokemon-page">{body}</div>;
  }
}

export default SinglePokemon;