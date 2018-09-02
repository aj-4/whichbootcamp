import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {getCookie} from '../utils/cookies';

import Survey from './survey';
import Feedback from './feedback';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    overflow: 'hidden',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SurveyModal extends React.Component {
  
  constructor(props) {
    super(props);
    const {isOpen} = this.props;
    // const surveyCookie = getCookie('surveyComplete');
    this.state = {
      // surveyCookie, 
      open: isOpen
    }
  }

  _renderbyType() {
    const {type, bootcampList} = this.props;

    switch(type) {
      case 'survey': 
        return <Survey bootcampList={bootcampList}/>
      case 'feedback':
        return <Feedback />
      default:
        return <div />
    }
  }

  render() {
    // const {surveyCookie} = this.state;
    const { classes, closeFn, isOpen } = this.props;

    return (
      <div>
        {/* {
          // we don't want people who have left a review to see this
          surveyCookie !== 'YES' &&
          <div>
            <Typography gutterBottom>Have you already attended a bootcamp?</Typography>
            <Button onClick={this.handleOpen}>Leave a Quick Review</Button>
          </div>
        } */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isOpen}
          onClose={closeFn}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {this._renderbyType()}
          </div>
        </Modal>
      </div>
    );
  }
}

SurveyModal.propTypes = {
  bootcampList: PropTypes.array,
};

SurveyModal.defaultProps = {
  bootcampList: []
};

export default withStyles(styles)(SurveyModal);