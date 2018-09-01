import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import WebDevIcon from '@material-ui/icons/Devices';
import DesignIcon from '@material-ui/icons/Brush'
import DataScienceIcon from '@material-ui/icons/InsertChartOutlined'

import RatingBars, {CircleStatBar} from './rating-bars';

const styles = theme => ({
  root: {
    width: '100%',
    padding: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: '#999',
    fontFamily: 'raleway',
    textTransform: 'uppercase',
    marginLeft: '10px'
  },
  expansionPanelSummary: {
    padding: '20px 0',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
    sectionStats: {
        position: 'absolute',
        top: '20px',
        right: '55px',
        padding: '0 !important'
    },
    languageBadge: {
        width: '50px',
        height: '50px',
    },
    programIcon: {
        fontSize: '40px'
    },
    locationText: {
        fontFamily: '"Raleway", Helvetica, sans-serif',
        fontSize: '1.2rem',
        color: '#999',
        textAlign: 'right',
        width: '100%',
        marginRight: '35px'
    },
    locations: {
      margin: '0 auto',
      fontSize: '1rem'
    },
    programDetails: {
      margin: '0 auto'
    }
});

class ControlledExpansionPanels extends React.Component {

  state = {
    expanded: null
  }

  badgeURLs = {
    Javascript: '/img/js-logo.png',
    Node: '/img/node-js-logo.png',
    Ruby: '/img/ruby-logo.png',
    Python: '/img/python-logo.png'
  }

  programIcons = {
    webDevelopment: WebDevIcon,
    design: DesignIcon,
    dataScience: DataScienceIcon
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { expanded } = this.state;

    const {data: {
        camel,
        locations,
        languages,
        programs,
        avgReviewStats,
    }, classes} = this.props;

    if (!avgReviewStats) {
      return <div />
    }

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Meta Score</Typography>
            <div className={classes.sectionStats}>
                  <CircleStatBar bootcampName={camel} statsData={avgReviewStats} />
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
                {<RatingBars bootcampName={camel} statsData={avgReviewStats}/>}                    
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Languages</Typography>
            <div className={classes.sectionStats}>
                {
                    languages.map((language, i) => {
                        return (
                            <Tooltip  key={`${language}-${i}`} title={language}>
                            <img 
                                className={classes.languageBadge} 
                                src={this.badgeURLs[language]}
                                alt={language} />
                            </Tooltip>
                        );
                    })
                }
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                {
                    languages.join(', ')
                }
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Programs</Typography>
            <div className={classes.sectionStats}>
                {
                programs.map((program, i) => {
                    const ProgramIcon = this.programIcons[program.camel];
                    return (
                        <Tooltip key={`${program.title}-${i}`} title={program.title}>
                            <ProgramIcon className={classes.programIcon}/>
                        </Tooltip>
                    );
                })
                }
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              {
                programs.map((program, i) => {
                  const {title, cost, details, duration, otherDetails} = program;
                  return (
                    <div key={i} className={classes.programDetails}>
                      <b>{title}</b> |
                      <i>${cost}</i> | <i>{duration}</i>
                      <p>{details}</p>
                      <p>{otherDetails}</p>
                    </div>
                  )
                })
              }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Locations</Typography>
                <div className={classes.locationText}>
                    {locations.length}
                </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.locations}>
              {
                locations.map((location, i) => <p key={i}>{location}</p>)
              }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);