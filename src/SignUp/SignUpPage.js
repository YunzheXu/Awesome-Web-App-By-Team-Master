import React, { Component } from "react";
//import axiosInstance from "../utils/axiosInstance";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import HeroesList from "./HeroesList";
import { Grid, Row, Col, Button, Form, FormControl, FormGroup, Checkbox, InputGroup, Panel, ControlLabel } from "react-bootstrap"
import axiosInstance from "../utils/userAPI";

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
      password: undefined
    };
  }

  async submitForm() {
    alert(`username: ${this.state.username}`);
    alert(`password: ${this.state.password}`);
  }

  componentWillMount() {
    
  }

  render() {
    const formInstance = (
      <Form horizontal onSubmit={e => {
        e.preventDefault();
        this.submitForm();
      }}>
        <FormGroup controlId="formHorizontalUsername">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl 
            type="username" 
            placeholder="Username" 
            onChange={e => {
              e.preventDefault();
              this.setState({ username: e.target.value });
            }}
            value={this.state.username}/>
          </Col>
        </FormGroup>
    
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl 
            type="password" 
            placeholder="Password" 
            onChange={e => {
              e.preventDefault();
              this.setState({ password: e.target.value });
            }}
            value={this.state.password}/>
          </Col>
        </FormGroup>
    
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Sign up
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );

    return (
      <div>
        {formInstance}
      </div>
    );
  }
}

export default SignUpPage;



