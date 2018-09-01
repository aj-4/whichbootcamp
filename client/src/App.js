import React, { Component } from 'react';
import 'babel-polyfill';
import AOS from 'aos';
import 'aos/dist/aos.css'

import Header from './components/header';
import SurveyModal from './components/survey-modal';
import BootcampList from './components/bootcamp-list';
import {fetchBootcamps} from './actions';

import {
  sortByWebDevCost, 
  sortByRating, 
  sortByReviewCount
} from './utils/sortAndSearch';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bootcampList: [],
    }
    this.handleSort = this.handleSort.bind(this)
  }

  componentDidMount() {
    AOS.init();
    fetchBootcamps().then(bootcampList => this._getInitialState(bootcampList))
  }

  handleSort(sortParam) {
    const {bootcampList} = this.state;
    switch(sortParam) {
      case 'rating':
        bootcampList.sort(sortByRating);
        break;
      case 'cost':
        bootcampList.sort(sortByWebDevCost);
        break;
      case 'reviews':
        bootcampList.sort(sortByReviewCount);
        break;
      default:
        break;
    }
    this.setState({bootcampList});
  }

  // 1. complete initial sort (by ranking) 
  // 2. attach a ranking by metascore to each bootcamp object
  _getInitialState(bootcampList) {
    bootcampList.sort(sortByRating);
    bootcampList.forEach((bootcamp, i) => {
      bootcamp.ranking = i + 1
    })
    this.setState({bootcampList});
  }

  mockBootcampList = [
    {
      name: 'Hack Reactor', 
      camel: 'hackReactor',
      locations: ['SF', 'NY', 'LA', 'Austin', 'Remote'], 
      languages: ['Javascript'], 
      programs: [
        {title: 'Web Development', camel: 'webDevelopment'}
      ],
      logoURL: '/img/hack-reactor-full-logo.png',
      miniLogoURL: '/img/hack-reactor-logo.jpg',
      bcColor: '#3C90D4'
    }
  ]

  render() {
    const {bootcampList} = this.state;

    return (
      <div className="App">
        <Header />
        <SurveyModal bootcampList={bootcampList}/>
        <BootcampList bootcampList={bootcampList} handleSort={this.handleSort}/>
      </div>
    );
  }
}

export default App;
