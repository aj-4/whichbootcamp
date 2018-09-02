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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';

import {surveyQuestions} from '../constants';
import '../css/bootcamp-list.css';
import {submitSurvey} from '../actions';
import {setCookie} from '../utils/cookies';

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
        margin: theme.spacing.unit * 8,
    },
    show: {
        visibility: 'visible'
    },
    formControl: {
      margin: '0 auto',
      textAlign: 'left'
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
    }
});

class Survey extends Component {
  
  state = {
    hasAttended: null,
    bootcampName: '',
    onQuestion: -1
  }

  handleButtonClick = name => event => {
      this.setState({[name]: event.target.innerText.toUpperCase()})
  }

  _slideNext() {
    if (this.state.onQuestion >= surveyQuestions.length) return;
    this.setState({onQuestion: this.state.onQuestion + 1},
        () => {
            let questionWidth = this.refs.questionContainer.offsetWidth;
            this.refs.allQuestionsSlider.style.transform = `translateX(-${this.state.onQuestion * questionWidth}px)`;
        }
    )
  }

  _slidePrev() {
    if (this.state.onQuestion === -1) return;
    this.setState({onQuestion: this.state.onQuestion - 1},
        () => {
            if (this.state.onQuestion > -1) {
                let questionWidth = this.refs.questionContainer.offsetWidth;
                this.refs.allQuestionsSlider.style.transform = `translateX(-${this.state.onQuestion * questionWidth}px)`;
            }
        }
    )
  }

  handleChange = event => {
    this.setState(
        {[event.target.name]: event.target.value},
        this._slideNext        
    );
  }

  handleBootcampChange = event => {
    const bootcampSelected = event.target.value.name;
    this.setState({
        [event.target.name]: bootcampSelected,
        bootcampId: event.target.value.id || null,
    },
        () => {
            if (bootcampSelected !== 'unlisted') {
                this._slideNext();
            }
        }
    )
  }

  submitSurvey = (e) => {
    e.preventDefault();
    submitSurvey(this.state)
    .then(res => {
        this.setState({
            surveyDone: true,
            doneMessage: `A verification email has been sent to ${res.email}`
        });
    })
    .catch(err => {
        this.setState({
            surveyError: 'An error has occured'
        })
    })
  }

  _renderInitial() {
        const {classes} = this.props;
      return (
          <div className={classes.sectionContainer}>
            <FormControl className={classes.formControl}>
                <h3 className="animated fadeInLeft">
                    Have you already attended a coding bootcamp?
                </h3>
                <Button 
                    size="small" 
                    variant="outlined" 
                    color="primary" 
                    className={`${classes.button} animated fadeIn`}
                    onClick={this.handleButtonClick('hasAttended')}
                >
                    Yes
                </Button>
                <Button 
                    size="small" 
                    variant="outlined" 
                    color="primary"
                    className={`${classes.button} animated fadeIn`}
                    onClick={this.handleButtonClick('hasAttended')}
                >
                    Not Yet
                </Button>
            </FormControl>
          </div>
      )
  }

  _renderHasNotAttended() {
    const {classes} = this.props;
    return (
        <div className={classes.questionsHeader}>
            Enjoy the site, and good luck!
        </div>
    )
  }

  _surveyQuestionsHeader() {
    const {classes} = this.props;
    return (
        <div className={classes.questionsHeader}>
            <h1 className="animated fadeIn">Awesome</h1>
            <div className="animated fadeInLeft">Would you mind answering a few questions?</div>
        </div>
    )
  }

  _questionsLeft() {
    const {classes} = this.props;
    const {onQuestion, bootcampName, newBootcamp} = this.state;
    return (
        <div className={`${classes.questionsHeader} animated fadeIn`}>
            Reviewing <h1>{bootcampName === 'unlisted' ? newBootcamp : bootcampName}</h1>
            {
                onQuestion < surveyQuestions.length ?
                <div>Question {onQuestion + 1} / {surveyQuestions.length}</div> :
                <div>Submit Your Review</div>
            }
        </div>
    )
  }

  _bootcampNameSelect() {
    const {bootcampList, classes} = this.props;
    const {bootcampName, bootcampId} = this.state;
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="survey-bc-name">Bootcamp Name</InputLabel>
            <Select
                value={this.state.bootcampName}
                onChange={this.handleBootcampChange}
                inputProps={{
                    name: 'bootcampName',
                    id: 'survey-bc-name',
                }}
            >
                {
                    bootcampList.map((bootcamp, i) => {
                        return <MenuItem key={i} selected={bootcampId===bootcamp.id} value={bootcamp}>{bootcamp.name}</MenuItem>
                    })
                }
                <MenuItem selected={bootcampName==='unlisted'} value={{name: "unlisted", id: null}}>
                    <em>It's not listed</em>
                </MenuItem>
            </Select>
            <FormHelperText>What was the name of your bootcamp?</FormHelperText>
          </FormControl>
    );
  }

  _textFieldChange = event => {
    if (event.keyCode === 13) this.handleChange(event);
    if (event.keyCode === undefined) this.handleChange(event);
  }

  _renderNewBootcampField() {
    const {classes} = this.props;
    return (
        <FormControl className={classes.formControl}>
            <TextField
                id="new-bootcamp"
                label="Add a bootcamp"
                className={classes.textField}
                onBlur={this._textFieldChange}
                onKeyDown={this._textFieldChange}
                inputProps={{
                    name: 'newBootcamp',
                }}
                margin="normal"
            />
          </FormControl>
    );
  }

  _renderConfirmSubmit() {
    const {classes} = this.props;
    return (
        <FormControl className={classes.questionContainer}>
            <TextField
                id="email"
                label="Your Email"
                helperText="Just to verify your review - we won't send you anything"
                className={classes.textField}
                onChange={this.handleChange}
                inputProps={{
                    name: 'email',
                }}
                margin="normal"
            />
             <Button 
                variant="extendedFab" 
                color="primary" 
                className={classes.button}
                onClick={(e) => this.submitSurvey(e)}    
            >
                Submit
                <DoneIcon className={classes.extendedIcon} />
            </Button>
          </FormControl>
    );
  }

  _renderQuestionAnswer(question) {
    const {classes} = this.props;
    const {text, camel, buttons} = question;
    return (
            <div className={`${classes.questionContainer} animated fadeInRight`} ref="questionContainer">
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{text}</FormLabel>
                <RadioGroup
                    aria-label={text}
                    name={camel}
                    className={classes.group}
                    value={this.state[camel]}
                    onChange={this.handleChange}
                >
                    {
                        buttons.map((button, i) => {
                            return <FormControlLabel 
                                key={`${camel}-${i}`}
                                value={button} 
                                control={<Radio color="primary"/>} 
                                label={button} />
                        })
                    }
                </RadioGroup>
            </FormControl>
        </div>
    )
  }

  renderFullSurvey() {
    const {classes} = this.props;
    return (
        <div className={classes.allQuestions} ref="allQuestionsSlider">
            {
                surveyQuestions.map((question, i) => {
                    return (
                        <div key={i}> 
                            {this._renderQuestionAnswer(question)}
                        </div>
                    );
                })
            }
            <div style={{margin: '0 auto'}}>{this._renderConfirmSubmit()}</div>
        </div>
    );
  }

  _renderSurveyDone() {
      const {doneMessage} = this.state;
      return (
          <div>
              <h1>Thanks So Much</h1>
                <p>For helping improve the site</p>
                {doneMessage} to finalize your review
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
        hasAttended, 
        bootcampName, 
        surveyError, 
        surveyDone, 
        onQuestion
    } = this.state;

    if (surveyError) {
        // set alert
        return (this._renderError())
    }

    if (surveyDone) {
        setCookie('surveyComplete','YES',1000)
        return (this._renderSurveyDone())
    }

    if (hasAttended === null) {
        return (this._renderInitial())
    }

    if (hasAttended === 'NOT YET') {
        setCookie('surveyComplete','NO',100)
        return (this._renderHasNotAttended())
    }

    if (onQuestion === -1) {
        return (
            <div>
                {this._surveyQuestionsHeader()}            
                {this._bootcampNameSelect()}
                {
                    bootcampName === 'unlisted' &&
                    this._renderNewBootcampField()
                }
            </div>
        );
    }

    return (
        <div className={classes.surveyContainer}>
            {this._questionsLeft()}            
            <form className={classes.root} autoComplete="off" onSubmit={e => this.submitSurvey(e)}>
                {this.renderFullSurvey()}
                <ArrowBackIcon className={classes.prevIcon} onClick={() => this._slidePrev()} />
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
