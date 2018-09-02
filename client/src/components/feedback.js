import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import DoneIcon from '@material-ui/icons/ThumbUp';
import BugIcon from '@material-ui/icons/BugReport';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';

import {surveyQuestions} from '../constants';
import '../css/bootcamp-list.css';
// import {submitFeedback} from '../actions';

const styles = theme => ({
    surveyContainer: {
        margin: '50px auto',
    },
    allQuestions: {
        display: 'flex',
        justifyContent: 'right',
        flexDirection: 'row',
        width: (theme.spacing.unit * 50 + theme.spacing.unit * 8) * surveyQuestions.length,
        transition: '0.5s ease-in all',
        ':last-child': {
            width: '200px'
        }
    },
    questionsHeader: {
        margin: '40px 0',
        color: 'grey'
    },
    questionContainer: {
        margin: 0,
        width: theme.spacing.unit * 45,
        padding: theme.spacing.unit * 4,
    },
    sectionContainer: {
        margin: '0 auto',
        textAlign: 'center'
    },
    show: {
        visibility: 'visible'
    },
    formControl: {
      margin: '0 auto',
      textAlign: 'center'
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginLeft: theme.spacing.unit,
    },
    thumbIcon: {
        fontSize: '30px'
    },
    question: {
        margin: '0 auto'
    },
    prevIcon: {
        position: 'absolute',
        left: '10%',
        bottom: '10%'
    },
    nextIcon: {
        position: 'absolute',
        right: '10%',
        bottom: '10%'
    },
    icons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center'
    },
    icon: {
        fontSize: '80px',
        '&:hover': {
            cursor: 'pointer',
            color: '#5F6D71'
        }
    }
});

class Survey extends Component {
  
  state = {
    onPage: 0
  }

  _slideNext() {
    if (this.state.onQuestion >= surveyQuestions.length) return;
    this.setState({onQuestion: this.state.onQuestion + 1},
        () => {
            let questionWidth = this.refs.questionContainer.offsetWidth;
            this.refs.slider.style.transform = `translateX(-${this.state.onQuestion * questionWidth}px)`;
        }
    )
  }

  _slidePrev() {
    if (this.state.onQuestion === -1) return;
    this.setState({onQuestion: this.state.onQuestion - 1},
        () => {
            if (this.state.onQuestion > -1) {
                let questionWidth = this.refs.questionContainer.offsetWidth;
                this.refs.slider.style.transform = `translateX(-${this.state.onQuestion * questionWidth}px)`;
            }
        }
    )
  }

  clickType = feedbackType => {
      this.setState({feedbackType});
    //   this._slideNext()
  }

  submitFeedback = (e) => {
    e.preventDefault();
    // submitFeedback(this.state)
    // .then(res => {
    //     this.setState({
    //         feedbackDone: true,
    //         doneMessage: `A verification email has been sent to ${res.email}`
    //     });
    // })
    // .catch(err => {
    //     this.setState({
    //         feedbackError: 'An error has occured'
    //     })
    // })
  }

  _renderInitial() {
        const {classes} = this.props;
      return (
          <div className={classes.sectionContainer}>
            <FormControl className={classes.formControl}>
                <h3 className="animated fadeInLeft">
                    Thanks! <br/><br/>
                    Which type of feedback?
                </h3>
                <div className={classes.icons}>
                    <div onClick={() => this.clickType('bug')}>
                        <BugIcon className={classes.icon}/>
                        <div>Bug</div>
                    </div>
                    <div onClick={() => this.clickType('suggestion')}>
                        <FeedbackIcon className={classes.icon}/>
                        <div>Suggestion</div>
                    </div>
                    
                </div>
            </FormControl>
          </div>
      )
  }

  _textFieldChange = event => {
    if (event.keyCode === 13) this.handleChange(event);
    if (event.keyCode === undefined) this.handleChange(event);
  }

  _renderfeedbackDone() {
      const {doneMessage} = this.state;
      return (
          <div>
              <h1>Thanks So Much</h1>
                <p>For helping improve the site</p>
          </div>
      );
  }

  _renderError() {
    return (
        <div>
            <h1>An Error has occured</h1>
              <p>Your submission failed :|</p>
              <p>Our team has been notified</p>
        </div>
    );
}

  render() {
    const {classes} = this.props;
    const {
        feedbackError, 
        feedbackDone, 
        onQuestion
    } = this.state;

    if (feedbackError) {
        return (this._renderError())
    }

    if (feedbackDone) {
        return (this._renderfeedbackDone())
    }

    return (
        <div className={classes.surveyContainer}>
            <form className={classes.root} autoComplete="off" onSubmit={e => this.submitFeedback(e)}>
                {this._renderInitial()}
                {
                    onQuestion < surveyQuestions.length && 
                    <ArrowForwardIcon className={classes.nextIcon} onClick={() => this._slideNext()}/>
                }
            </form>
        </div>
    );
  }
}

Survey.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  Survey.defaultProps = {
      bootcampList: []
  }
  
  export default withStyles(styles)(Survey);
