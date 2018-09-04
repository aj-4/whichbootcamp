import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import StatPanels from './stat-panels';
import '../css/bootcamp-list.css';
import {getOrdinal} from '../utils/ordinalSuffix';

const styles = theme => ({
    // cardContainer: {
    //     display: 'inline-block'
    // },
    card: {
      width: '28%',
      minWidth: '300px',
      margin: '30px',
      display: 'inline-block',
      float: 'left',
      transition: '.1s ease-in all',
      '&:hover': {
        transform: 'translateY(-1%)'
      }
    },
    cardContent: {
      padding: 0
    },
    media: {
      height: 0,
    },
    cardHeroContainer: {
        height: '200px',
        // overflow: 'hidden',
        position: 'relative',
        width: '100%',
    },
    cardHeroImg: {
        width: '80%',
        maxHeight: '65%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        transition: '.1s ease-in-out all'
    },
    actions: {
      display: 'flex',
    },
    cardDivider: {
        height: '5px'
    },
    iconSummary: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      padding: '0 15px',
      display: 'flex',
      justifyContent: 'space-around'
    },
    iconStat: {
      flexBasis: 'auto',
      display: 'table'
    },
    iconStatText: {
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'left'
    }
  });
  

class BootcampCard extends Component {

  static defaultProps = {
      bootcampData: {
          languages: []
      }
  }

  componentDidUpdate() {
    this.refs.card.classList.remove('animated', 'fadeIn');
    setTimeout(() => this.refs.card.classList.add('animated', 'fadeIn'));
  }

  _getWebDevCost(programs) {
    if (!programs.length) return '-';
    let webDev = programs.filter(program => program.camel === 'webDevelopment');
    return webDev.length ? webDev[0].cost : '-'
  }

  render() {
    const {data: {
        logoURL,
        bcColor,
        ranking,
        avgReviewStats,
        Programs,
        websiteURL
    }, classes, data, i} = this.props;

    const reviewCount = +avgReviewStats.reviewCount;
    const cost = this._getWebDevCost(Programs);

  return (
      <div 
        data-aos="fade-up" 
        ref="card"
        data-aos-delay={`${(i % 3) * 200}`}
        className={`${classes.cardContainer}`}
      >
        <Card className={classes.card}>
        <a href={websiteURL} target="_blank">
        <CardContent className={classes.cardContent}>
          <div 
            className={classes.cardHeroContainer} 
            style={{
              borderBottom: `5px solid ${bcColor}`,
              borderTop: `5px solid ${bcColor}`
            }}
          >
            <div className={classes.iconSummary} style={{color: bcColor}}>
              <div className={classes.iconStat}>
                <ThumbUpIcon /> <div className={classes.iconStatText}>&nbsp;{getOrdinal(ranking)}</div>
              </div>
              <div className={classes.iconStat}>
                <AttachMoneyIcon /> <div className={classes.iconStatText}>{cost}</div>
              </div>
              <div className={classes.iconStat}>
                <TrendingUpIcon /> <div className={classes.iconStatText}>{reviewCount} {+reviewCount === 1 ? 'review' : 'reviews'}</div>
              </div>
            </div>
            <div style={{width: '100%', height: '100%', backgroundColor: bcColor, opacity: .2}} />
            <img className={classes.cardHeroImg} src={logoURL} alt="logo" />
          </div>
        </CardContent>
        </a>
          <StatPanels 
            data={data}
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(BootcampCard);
