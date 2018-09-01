import React, { Component } from 'react';
import '../css/header.css';

class Header extends Component {

  render() {
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
                    <div className="animated fadeInDown typewriter-text anim-typewriter">An unbiased list of coding bootcamps</div>
                </div>
            </header>
      </div>
    );
  }
}

export default Header;
