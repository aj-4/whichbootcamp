import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import '../css/header.css';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const styles = theme => ({
    ctr: {
        marginTop: '30px',
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
        },
        [theme.breakpoints.down('md')]: {
            width: '60%'
        }
    },
    backgroundContainer: {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        zIndex: '-1',
    },
    bgImage: {
        position: 'absolute',
        display: 'block',
        top: '-100%',
        left: '0',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            height: '100%',
            top: '0',
            left: '0%',
            width: '100%'    
        },
        [theme.breakpoints.down('sm')]: {
            height: '800px',
            top: '0',
            left: '-10%',
            width: '150%'    
        }
    },
    heroTextContainer: {
        width: '65%',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            width: '80%'
        }
    },
    heroHeader: {
        color: '#FDFDFD',
        textAlign: 'left',
        position: 'absolute',
        top: '20%',
        right: '0%'
    },  
    whichText: {
        fontSize: '7.5vw',
        [theme.breakpoints.down('md')]: {
            fontSize: '12vw'
        }
    },
    buttonText: {
        textTransform: 'uppercase',
        fontSize: '14px',
        fontWeight: '800'
    },
    typewriterText: {
        position: 'relative',
        top: '50%',  
        width: '19em',
        margin: '0 auto',
        borderRight: '10px solid rgba(255,255,255,.75)',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        transform: 'translateY(-50%)',    
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
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
                <div className={classes.backgroundContainer}>
                    <img className={classes.bgImage} src="/img/homescreen.jpg" alt="" />
                </div>
                <header className={classes.heroHeader}>
                    <div className={classes.heroTextContainer}>
                    <h1 className="animated fadeIn hero-title">
                        <span className={classes.whichText}>Which</span> Bootcamp?
                    </h1>
                    <div className={`animated fadeInDown ${classes.typewriterText} anim-typewriter`}>
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
