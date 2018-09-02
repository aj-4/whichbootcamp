import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import '../css/bootcamp-list.css';
import BootcampCard from './bootcamp-card';
import SortBy from './sort-by';

import ReviewIcon from '@material-ui/icons/RateReview';
import LayersIcon from '@material-ui/icons/Layers';
import FlagIcon from '@material-ui/icons/Flag';

const styles = theme => ({
    ctr: {
        padding: '50px 0',
        height: '100%',
        // backgroundColor: 'rgba(160,166,171,0.1)'
    },
    ctrHero: {
        backgroundColor: 'rgba(255, 243, 232, .9)',
        padding: '80px 0',
        boxShadow: '1px 0 10px rgba(0, 0, 0, .3)',
        position: 'relative',
        overflow: 'hidden'
    },
    bgImg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '0',
        top: '0',
        zIndex: '-1',
        '-webkit-filter': 'grayscale(100%)',
        filter: 'grayscale(100%)'
    },
    sectionTitle: {
        color: '#5f6d71',
        fontSize: '5vw',
        fontWeight: '900',
    },
    sortBy: {
        padding: '30px 0'
    },
    cta: {
        fontSize: '2vw',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '0 auto',
        width: '30%',
        height: '150px'
    },
    actionItem: {
        textTransform: 'uppercase',
        fontSize: '14px',
        fontWeight: '600',
        color: '#5B6367',
        '&:hover': {
            cursor: 'pointer',
            color: 'black'
        }
    },
    icon: {
        fontSize: '60px',
        transition: '.1s ease',
        '&:hover': {
            // transform: 'scale(1.1)',
        }
    }
});

class BootcampList extends Component {

    clickCard() {

    }

    clickReview() {
        this.props.openSurvey();
    }

    clickBug() {
        this.props.openFeedback();
    }

    render() {

        const { bootcampList, classes, handleSort } = this.props;

        return (
            <div className={`${classes.ctr} list-container`}>
                <div className={classes.ctrHero}>
                    <img className={classes.bgImg} src="/img/code-bg-min.jpg" alt="code" />
                    <div className={classes.sectionTitle}>Bootcamps</div>
                    <p>This site is a work in progress, suggestions are greatly appreciated</p>
                    <div className={classes.cta}>
                       <div className={classes.actionItem} onClick={this.clickCard}>
                            <div><LayersIcon className={classes.icon}/></div>
                            Click a card<br/> for details 
                       </div>
                       <div className={classes.actionItem} onClick={() => this.clickReview()}>
                            <div><ReviewIcon className={classes.icon}/></div>
                            Write<br/> a review
                        </div>
                       <div className={classes.actionItem} onClick={() => this.clickBug()}>
                            <div><FlagIcon className={classes.icon}/></div>
                            Leave feedback<br/>for this site 
                        </div>
                    </div>
                </div>
                <SortBy handleSort={handleSort} className={classes.sortBy} />    
                <ul>
                    {
                        bootcampList.map((bootcampData, i) => {
                            return <BootcampCard key={i} data={bootcampData} i={i} />
                        })
                    }
                </ul>
            </div>
        );
    }
}

BootcampList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BootcampList);
