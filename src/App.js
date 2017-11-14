import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

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
      const heroDescription = (
        <div>
        <h3>{hero.localized_name}</h3>
        </div>
      );
      
      const picture = (
        <img
        className="img-responsive"
        src={`https://api.opendota.com${hero.img}`}
        alt={hero.localized_name}
      />);
      
      return (
        <div className="col-sm-4 col-md-4">
          <h3>{hero.localized_name}</h3>
          {picture}
          <p><b>#{hero.id}</b></p>
        </div>
      );
            
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div>
          {heroDisplays}
        </div>

      </div>
    );
  }
}

export default App;
