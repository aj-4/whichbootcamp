import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import '../css/bootcamp-list.css';
import BootcampCard from './bootcamp-card';
import SortBy from './sort-by';

const styles = theme => ({
    sortBy: {
    }
  });
  
class BootcampList extends Component {
  
  render() {

    const {bootcampList, classes, handleSort} = this.props;

    return (
        <div className="list-container">
            <h1>Bootcamps</h1>
            <p>Click a section for more details</p>
            <SortBy handleSort={handleSort} className={classes.sortBy}/>
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
