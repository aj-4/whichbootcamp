import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import '../css/bootcamp-list.css';
import BootcampCard from './bootcamp-card';
import SortBy from './sort-by';

const styles = theme => ({
    ctr: {
        padding: '50px 0',
        height: '100%',
        // backgroundColor: 'rgba(160,166,171,0.1)'
    },
    ctrHero: {
        backgroundColor: '#DED8D3',
        padding: '80px 0',
        border: '1px solid grey'
    },
    sectionTitle: {
        color: '#666e72',
        fontSize: '7vw',
        fontWeight: '900',
    },
    sortBy: {
        padding: '30px 0'
    }
});

class BootcampList extends Component {

    render() {

        const { bootcampList, classes, handleSort } = this.props;

        return (
            <div className={`${classes.ctr} list-container`}>
                <div className={classes.ctrHero}>
                    <div className={classes.sectionTitle}>Bootcamps</div>
                    <p>This list is a work in progress and is updated regularly with new information</p>
                    <p>Click a section for more details</p>
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
