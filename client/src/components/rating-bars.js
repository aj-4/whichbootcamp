import React, {Component} from 'react';
import ProgressBar from 'progressbar.js';

const statsLabels = {
    futureOutlook: {label: 'think this program has a positive future'},
    goodInstructors: {label: 'had a positive impression of the instructors'},
    jobSpeed: {label: 'got a job within 6 months of completion'},
    worthTheMoney: {label: 'thought it was worth the cost'},
    wouldAttendAgain: {label: 'would do it all over given the chance'},
    metaScore: {label: 'average of the above scores'}
}

const createCircleBar = (className, statValue) => {

var bar = new ProgressBar.Circle(className, {
    color: '#aaa',
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#c64343', width: 1 },
    to: { color: '#2ba040', width: 4 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
  
      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('N/A');
      } else {
        circle.setText(value);
      }

    }
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = '1.2rem';
  
  bar.animate(statValue);  // Number from 0.0 to 1.0
}

export class CircleStatBar extends Component {

    componentDidMount() {
        this._createCircle();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.bootcampName !== this.props.bootcampName) {
            this._createCircle();
        }
    }
    _createCircle() {
        const {statsData, bootcampName} = this.props;
        const className= `.${bootcampName}-meta-score`;
        const statValue = +statsData.metaScore || 0;
        let el = document.querySelector(className);
        if (el) el.innerHTML = '';
        createCircleBar(className, statValue);
    }
    render() {
        const {bootcampName} = this.props;
        return (
            <div 
                className={`${bootcampName}-meta-score`} 
                style={{
                    width: '50px',
                    height: '50px',
                }}
            />)
    }
}

const createBar = (className, value) => {
    const bar = new ProgressBar.Line(className, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'},
        text: {
            style: {
              // Text color.
              // Default: same as stroke color (options.color)
              color: '#999',
              position: 'absolute',
              left: '0',
              top: '25px',
              padding: 0,
              margin: 0,
              transform: null
            },
            autoStyleContainer: false
          },
        from: {color: '#c64343'},
        to: {color: '#2ba040'},
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
          bar.setText(Math.round(bar.value() * 100) + ' %');
        }
      });
      
      bar.animate(value);  // Number from 0.0 to 1.0
}

class RatingBars extends Component {

    componentDidMount() {
        this._hydrateBars();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.bootcampName !== this.props.bootcampName) {
            this._hydrateBars();
        }
    }

    _hydrateBars() {
        const {bootcampName, statsData} = this.props;
        if (statsData) {
            const statsObj = this._createStatsDataObject();
            for (let stat in statsObj) {
                const className = `.${bootcampName}-${stat}`;
                const statValue = +statsObj[stat].score;
                let el = document.querySelector(className);
                el.innerHTML = '';
                createBar(className, statValue);
            }
        }
    }

    _createStatsDataObject() {
        const {statsData} = this.props;
        const avgStatsObj = {};

        if (statsData) {
          for (let key in statsData) {
            if (key === 'reviewCount') continue;
            avgStatsObj[key] = {};
            avgStatsObj[key]['score'] = Number(statsData[key]);
            avgStatsObj[key]['label'] = statsLabels[key].label;
          }   
          return avgStatsObj;
        }
      }

    _createRatingBarDivs() {
        const {bootcampName} = this.props;
        const ratingBarList = [];
        for (let stat in statsLabels) {
            const className = `${bootcampName}-${stat}`;
            
            ratingBarList.push(
                <div key={className}>
                    <div 
                    className={className} 
                    style={{
                        margin: '25px 0',
                        width: '300px',
                        height: '2px',
                        position: 'relative'
                    }}
                    />
                    <div style={{
                        textAlign: 'left', 
                        color: '#999', 
                        fontSize: '12px',
                        marginLeft: '50px'
                        }}>
                        {statsLabels[stat].label}
                    </div>
                </div>
                
            );
        }
        return ratingBarList;
    }

    render() {
        const {bootcampName} = this.props;
        return (
            <div>
                <p style={{fontSize: '14px', color: '#999'}}>Of the people who attended this bootcamp...</p>
                <div className={`${bootcampName}-all-bars`}>{this._createRatingBarDivs()}</div>
            </div>
        );
    }
}

export default RatingBars;