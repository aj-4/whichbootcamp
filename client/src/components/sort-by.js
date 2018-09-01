import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const styles = theme => ({
  root: {
    width: '50vw',
    margin: '0 auto',
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
        handleSort(itemName)
        this.setState({selected: itemName});
    }

    _getStyle(itemName) {
        const {selected} = this.state;
        if (itemName === selected) {
            return {
                backgroundColor: 'rgba(55, 72, 172, .6)',
            }
        } else {
            return {}
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} data-aos="fade-right">
                <div className={classes.title}>SORT BY</div> 
            <MenuList>
                <MenuItem className={classes.menuItem} style={this._getStyle('rating')} onClick={() => this._handleSelect('rating')}>
                    <ListItemIcon className={classes.icon} >
                        <ThumbUpIcon />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Rating" />
                </MenuItem>
                <MenuItem className={classes.menuItem} style={this._getStyle('cost')} onClick={() => this._handleSelect('cost')}>
                    <ListItemIcon className={classes.icon}>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Cost" />
                </MenuItem>
                <MenuItem className={classes.menuItem} style={this._getStyle('reviews')} onClick={() => this._handleSelect('reviews')}>
                    <ListItemIcon className={classes.icon}>
                        <TrendingUpIcon />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Review Count" />
                </MenuItem>
            </MenuList>
            </Paper>
        );
    }
}

SortBy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortBy);