import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import obj from "../utils/guideAPI";

import {ListGroup, ListGroupItem, Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, Panel} from "react-bootstrap"
import "./singleHero.css"
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
HighchartsMore(ReactHighcharts.Highcharts);

function getHero(heroes, id) {
  return new Promise ((fulfill, reject) => {
    var index;
    heroes.forEach(function(element) {
      if (element.id === id) {
        index = heroes.indexOf(element);
      }
    });
    fulfill(heroes[index]);
  });
}

function getWinrateData(hero) {
  return new Promise ((fulfill, reject) => {
    var chartdata = [];
    for (let rank = 1; rank <= 7; rank++) {
      let win = rank.toString() + "_win";
      let pick = rank.toString() + "_pick";
      let winrate = (hero[win] / hero[pick]);
      winrate = parseFloat((winrate * 100).toFixed(2));
      chartdata.push(winrate);
    }
    fulfill(chartdata);
  });
}

function getStatData(hero) {
  return new Promise ((fufill, reject) => {
    var chartdata = [
      hero.base_mana / 3,
      (hero.base_attack_max + hero.base_attack_min) / 2,
      hero.base_int,
      hero.base_agi,
      hero.base_str,
      hero.base_health / 10
    ];
    fufill(chartdata);
  });
}

class SingleHero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: undefined,
      loading: false,
      error: false,
      winrateChart: {},
      statChart: {},
      guideTitle:undefined,
      guideContent:undefined,
      guideList:undefined,
      file: '',
      imagePreviewUrl: ''
    };
    this._handleImageChange = this._handleImageChange.bind(this);
   
  }


  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }


  submitGuideForm(id,title,content,file){
      obj.store(id,title,content,file);
      this.componentDidMount();
  }

  async loadHeroById(heroId) {
    try {
      this.setState({ loading: true });
      const url = `heroStats`;
      const response = await axiosInstance.get(url);
      var heroes = response.data;
      var id = parseInt(heroId);
     
      var hero = await getHero(heroes, id);
      var winrateData = await getWinrateData(hero);
      var statData = await getStatData(hero);
      
      let t=await obj.display(heroId);
      this.setState({ guideList: t });


      this.setState({ loading: false, 
                      hero, 
                      error: false,
                      winrateChart: {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Winrate based on Rank Points'
                        },
                        subtitle: {
                            text: 'Datasource: opendota.com'
                        },
                        xAxis: {
                            categories: ['1000','2000','3000','4000','5000','6000','7000']
                        },
                        yAxis: {
                            title: {
                                text: 'Winrate(%)'
                            }
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true          
                                },
                            }
                        },
                        series: [{
                            name: 'Winrate',
                            data: winrateData
                        }],
                        credits:{
                          enabled: false         
                        }
                      },

                      statChart: {
                        chart: {
                          polar: true,
                          type: 'line'
                        },
                        title: {
                            text: 'Hero Stat'
                        },
                        subtitle: {
                          text: 'Datasource: opendota.com'
                        },
                        pane: {
                            size: '80%'
                        },
                        xAxis: {
                            categories: ['Mana(1/3)', 'Avg Attack', 'Int', 'Agi',
                                        'Str', 'Health(1/10)'],
                            tickmarkPlacement: 'on',
                            lineWidth: 0
                        },
                        yAxis: {
                            gridLineInterpolation: 'polygon',
                            lineWidth: 0,
                            min: 0
                        },
                        legend: {
                            align: 'right',
                            verticalAlign: 'top',
                            y: 70,
                            layout: 'vertical'
                        },
                        series: [{
                            name: 'Base Stat',
                            data: statData,
                            pointPlacement: 'on'
                          }],
                        credits:{
                          enabled: false         
                        }
                      }
                    }); 
          
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
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }



    let body = null;
   // alert(this.state.error );
    if (this.state.error === true) {
      return <Redirect to="/error/" />
    }

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.hero) {
      const url = this.props.match.url;
      const hero = this.state.hero;

      let guidedisplay=this.state.guideList.guide.map((guide)=>{
        let title=(
          <p>Title:{guide.title}</p>
        );
        let content=(
          <p>Content:{guide.content}</p>
        );
        let image=(
          <img src={guide.file} />
        );
        return (
          <li>
          <div>
            {title}
            {content}
            {image}
          </div>
          </li>
        );
      });


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
                                <Col sm={12} md={6}>
                                  <Row>
                                    <div className="menu-header">
                                      <h2>Stat</h2>
                                    </div>
                                  </Row>
                                  <Row>
                                    <div className="content">
                                      <div style={{width: '100%', padding: '20px '}}>
                                        <ReactHighcharts config={this.state.statChart}></ReactHighcharts>
                                      </div>
                                    </div>
                                  </Row>
                                </Col>
                                <Col sm={12} md={6}>
                                  <Row>
                                    <div className="menu-header">
                                      <h2>Winrate</h2>
                                    </div>
                                  </Row>
                                  <Row>
                                    <div className="content">
                                      <div style={{width: '100%', padding: '20px '}}>
                                        <ReactHighcharts config={this.state.winrateChart}></ReactHighcharts>
                                      </div>
                                    </div>
                                  </Row>
                                </Col>
                              </Row>



                             

                              <Row>
                                <div className="menu-header">
                                  <h2>Guides</h2>
                                </div>
                              </Row>

                              <Row>
                                <div className="content">
                                  <ol>
                                     {guidedisplay}
                                  </ol>
                                </div>
                              </Row>
                              
                              <Row>
                                <div className="guide-writting">
                                  <form
                                  onSubmit={e => {
                                    e.preventDefault();
                                    this.submitGuideForm(this.props.match.params.id,this.state.guideTitle,this.state.guideContent,this.state.imagePreviewUrl);
                                    this.setState({ guideTitle:"" });
                                    this.setState({ guideContent:"" });
                                    this.setState({ file:"" });
                                    this.setState({ imagePreviewUrl:"" });
                                  }}
                                  >
                                    <FormGroup >
                                      <ControlLabel>Hero Guide Title</ControlLabel>
                                      <FormControl type="text" placeholder="Your guide's title" 
                                          onChange={e => {
                                            e.preventDefault();
                                            this.setState({ guideTitle:e.target.value });
                                          }}
                                        value={this.state.guideTitle}  
                                        required              
                                      />
                                    </FormGroup>
                                    <FormGroup controlId="formControlsTextarea" >
                                      <ControlLabel>Hero Guide Content</ControlLabel>
                                      <FormControl style={{height: '200px'}} componentClass="textarea" placeholder="Write your guide here!"
                                      onChange={e => {
                                        e.preventDefault();
                                        this.setState({ guideContent:e.target.value });
                                      }}
                                      value={this.state.guideContent} 
                                      required
                                      />
                                    </FormGroup>

                                    <FormGroup>
                                    <ControlLabel>Hero Guide Image</ControlLabel>
                                    <FormControl type="file" onChange={this._handleImageChange} required/>
                                    {$imagePreview}
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

