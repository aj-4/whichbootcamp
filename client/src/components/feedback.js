import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import BugIcon from '@material-ui/icons/BugReport';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import {submitFeedback} from '../actions';

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
        width: (theme.spacing.unit * 50 + theme.spacing.unit * 8) * 2,
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
        bottom: '10%',
        color: 'darkgrey',
        '&:hover': {
            cursor: 'pointer',
            color: 'black'
        }
    },
    nextIcon: {
        position: 'absolute',
        right: '10%',
        bottom: '10%',
        display: 'flex',
        alignItems: 'center',
        color: 'darkgrey',
        '&:hover': {
            cursor: 'pointer',
            color: 'black'
        }
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
    onView: 0
  }

  clickType = feedbackType => {
      console.log('clicked', feedbackType);
      this.setState({feedbackType, onView: 1});
  }

  submitFeedback = (e) => {
    const {feedbackType, feedback} = this.state;
    if (!feedback || feedback.length < 5) {
        this.setState({feedbackError: "You'll need to type a bit more"})
        return;
    }
    submitFeedback(feedback, feedbackType)
    .then(res => {
        this.setState({
            onView: 2,
            feedbackDone: true,
        });
    })
    .catch(err => {
        this.setState({
            feedbackError: 'Hmm...that didn\'t work.'
        })
    })
  }

  handleChange = text => {
      const {feedback} = this.state;
      this.setState({feedback: text.target.value});
      if (feedback && feedback.length > 5) {
          this.setState({feedbackError: null})
      }
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
                <div className={classes.icons} >
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
      return (
          <div>
              <h1>Submitted</h1>
                <p>Thanks for helping to improve the site!</p>
          </div>
      );
  }

  render() {
    const {classes} = this.props;
    const {
        feedbackError, 
        feedbackDone, 
        feedbackType,
        feedback,
        onView
    } = this.state;

    if (feedbackDone) {
        return (this._renderfeedbackDone())
    }

    return (
        <div className={classes.surveyContainer}>
                {
                    onView === 0 &&
                    this._renderInitial()
                }
                {
                    onView === 1 && 
                    <div>
                        <ArrowBackIcon className={classes.prevIcon} onClick={() => this.setState({onView: 0})}/>                        
                        <div className={classes.nextIcon} style={{color: feedback ? 'navy' : ''}} onClick={() => this.submitFeedback()}>SUBMIT<ArrowForwardIcon/></div>
                        <h3 style={{color: 'darkgrey', textTransform: 'uppercase'}}>New {feedbackType}</h3>
                        <TextField 
                            error={!!feedbackError}
                            helperText={feedbackError}
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Write here"
                            fullWidth={true}
                            multiline={true}
                            rows={1}
                            rowsMax={4}
                        />
                    </div>
                }
                {
                    onView === 2 &&
                    this._renderfeedbackDone()
                }
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
