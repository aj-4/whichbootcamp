import React, { Component } from 'react';
import 'babel-polyfill';
import AOS from 'aos';
import 'aos/dist/aos.css'

import Header from './components/header';
import Modal from './components/modal';
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
      surveyIsOpen: false,
      feedbackIsOpen: false
    }
    this.handleSort = this.handleSort.bind(this);
    this.toggleSurvey = this.toggleSurvey.bind(this);
    this.toggleFeedback = this.toggleFeedback.bind(this);
  }

  componentDidMount() {
    AOS.init();
    fetchBootcamps().then(bootcampList => this._getInitialState(bootcampList))
  }

  handleSort(sortParam, descending) {
    const {bootcampList} = this.state;
    switch(sortParam) {
      case 'rating':
        if (descending) {
          bootcampList.sort(sortByRating);
        } else {
          bootcampList.sort(sortByRating).reverse();
        }
        break;
      case 'cost':
        if (descending) {
          bootcampList.sort(sortByWebDevCost);
        } else {
          bootcampList.sort(sortByWebDevCost).reverse();
        }
        break;
      case 'reviews':
        if (descending) {
          bootcampList.sort(sortByReviewCount);
        } else {
          bootcampList.sort(sortByReviewCount).reverse();
        }
        break;
      default:
        break;
    }
    this.setState({bootcampList});
  }

  toggleSurvey() {
    this.setState({surveyIsOpen: !this.state.surveyIsOpen})
  }

  toggleFeedback() {
    this.setState({feedbackIsOpen: !this.state.feedbackIsOpen})
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
    const {bootcampList, surveyIsOpen, feedbackIsOpen} = this.state;

    return (
      <div className="App">
        <Header />
        <Modal type="survey" bootcampList={bootcampList} isOpen={surveyIsOpen} closeFn={this.toggleSurvey}/>
        <Modal type="feedback" bootcampList={bootcampList} isOpen={feedbackIsOpen} closeFn={this.toggleFeedback}/>
        <BootcampList bootcampList={bootcampList} handleSort={this.handleSort} openSurvey={this.toggleSurvey} openFeedback={this.toggleFeedback}/>
      </div>
    );
  }
}

export default App;
