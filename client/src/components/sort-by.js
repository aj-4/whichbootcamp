import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

const styles = theme => ({
  root: {
    width: '50vw',
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative'
  },
  title: {
    left: '2%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    textTransform: 'uppercase',
    fontSize: '30px',
    letterSpacing: '3px',
    color: 'lightgrey'
  },
  menuItem: {
    float: 'left',
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

class SortBy extends Component {


    state = {
        selected: ''
    }

    _handleSelect(itemName) {
        const {handleSort} = this.props;
        const {selected, descending} = this.state;
        let dsc;
        if (selected === itemName) {
            dsc = !descending;
        } else {
            dsc = true;
        }
        handleSort(itemName, dsc)
        this.setState({selected: itemName, descending: dsc});
    }

    _getActiveIcon(camel, label, ascIcon, descIcon) {
        const {descending} = this.state;
        const {classes} = this.props;
        const DescIcon = descIcon;
        const AscIcon = ascIcon
        return (
            <MenuItem 
                className={classes.menuItem} 
                style={{backgroundColor: descending ? '#74B86D' : '#B05A4E'}} 
                onClick={() => this._handleSelect(camel)}
            >
                <ListItemIcon className={classes.icon} >
                    {descending ? <AscIcon /> : <DescIcon />}
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary={label} />
            </MenuItem>
        )
    }

    _getNormalIcon(camel, label, neturalIcon) {
        const NeutralIcon = neturalIcon;
        const {classes} = this.props;
        return (
            <MenuItem 
                className={classes.menuItem} 
                onClick={() => this._handleSelect(camel)}
            >
                <ListItemIcon className={classes.icon} >
                    <NeutralIcon />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary={label} />
            </MenuItem>
        )
    }

    _getIcon(camel, label, ascIcon, descIcon, neutralIcon) {
        const {selected} = this.state;
        if (camel === selected) {
            return this._getActiveIcon(camel, label, ascIcon, descIcon);
        } else {
            return this._getNormalIcon(camel, label, neutralIcon);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} data-aos="fade-right">
                <div className={classes.title}>SORT BY</div> 
                <MenuList>
                    {this._getIcon('rating', 'Rating', ThumbUpIcon, ThumbDownIcon, ThumbUpIcon)}
                    {this._getIcon('cost', 'Cost', TrendingUpIcon, TrendingDownIcon, AttachMoneyIcon)}
                    {this._getIcon('reviews', 'Review Count', PeopleIcon, PersonIcon, PeopleIcon)}
                </MenuList>
            </Paper>
        );
    }
}

SortBy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortBy);