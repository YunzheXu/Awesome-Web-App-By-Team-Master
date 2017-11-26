import React, { Component } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HeroesList from "./HeroesList";
import {
  Grid,
  Row,
  Col,
  Button
} from "react-bootstrap"


class HeroPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroesList: [],
      activePage: undefined
    };
  }

  async loadHeroesList(pageNumber) {
    const url = `hero/?limit=20&offset=${pageNumber * 20}`;
    const response = await axiosInstance.get(url);
    
    const resultList = response.data.results;
    this.setState({ 
      heroesList: resultList ,
      activePage: pageNumber
    });
  }
  
  componentWillMount() {
    const pageNumber = parseInt(this.props.match.params.page);
    this.loadHeroesList(pageNumber);
  }

  async componentWillReceiveProps(nextProps) {
    const pageNumber = nextProps.match.params.page;
    const oldPageNumber = this.props.match.params.page;

    if (pageNumber !== oldPageNumber) {
      await this.loadHeroesList(parseInt(pageNumber));
    }
  }

  render() {
    //alert("Hello -- ");
    let buttonDisplay = null;
    if(this.state.activePage === 0) {
      buttonDisplay = (
        <div>
          <ul class="pager">
            <li class="disabled">
             <span>Previous</span>
            </li>
            <li>
              <Link to={`/hero/page/${this.state.activePage + 1}`}  style={{ textDecoration: 'none' }}>Next</Link>
            </li>
          </ul>
        </div>
      );
    } else if (this.state.activePage === 40) {
      buttonDisplay = (
        <div>
          <ul class="pager">
              <li>
                <Link to={`/hero/page/${this.state.activePage - 1}`}  style={{ textDecoration: 'none' }}>Previous</Link>
              </li>
              <li class="disabled">
                <span>Next</span>
              </li>
        </ul>
        </div>
      );
    } else {
      buttonDisplay = (
        <div>
          <ul class="pager">
              <li>
                <Link to={`/hero/page/${this.state.activePage - 1}`}  style={{ textDecoration: 'none' }}>Previous</Link>
              </li>
              <li>
                <Link to={`/hero/page/${this.state.activePage + 1}`}  style={{ textDecoration: 'none' }}>Next</Link>
              </li>
          </ul>
        </div>
        );
    }


    return (
      <div className="heroesList">
        <Grid>
          <HeroesList hero={this.state.heroesList} />
            <Row>
              {buttonDisplay}
            </Row>
        </Grid>
      </div>
    );
  }
}
export default HeroPage;
