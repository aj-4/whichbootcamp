import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import '../css/header.css';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const styles = theme => ({
    ctr: {
        marginTop: '30px'
    },
    button: {
        backgroundColor: 'white',
        width: '30%',
        margin: '0 auto',
        borderRadius: '10px',
        color: '#99A0A4',
        fontWeight: '500',
        fontSize: '20px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(255,255,255,.8)'
        }
    },
    buttonText: {
        textTransform: 'uppercase',
        fontSize: '14px',
        fontWeight: '800'
    }
});

class Header extends Component {

    scrollToBootcamps() {
        document.querySelector('.list-container').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className="background-container">
                    <img src="/img/homescreen.jpg" alt="" />
                </div>
                <header className="hero-header">
                    <div className="hero-text-container">
                    <h1 className="animated fadeIn hero-title">
                        <span className="which-text">Which</span> Bootcamp?
                    </h1>
                    <div className="animated fadeInDown typewriter-text anim-typewriter">
                        A list of the most popular coding bootcamps
                    </div>
                    <div className={classes.ctr}>
                        <div className={classes.button} onClick={this.scrollToBootcamps}>
                            <div className={classes.buttonText}>see the list </div>
                            <ArrowDownIcon className={classes.icon} />
                        </div>
                    </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
