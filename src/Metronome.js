import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';


class Metronome extends Component {
    constructor(props) {
        super(props);
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    
        this.state = {
          playing: false,
          count: 0,
          bpm: 100,
          beatsPerMeasure: 4
        };
    }
    handleBpmChange = event => {
            const bpm = event.target.value;

            if (this.state.playing) {
                //stop the old timer and start a new one
                clearInterval(this.timer);
                this.timer =setInterval(this.playClick, (60/bpm) *1000);

                //set the new bpm, and reset the beat counter
                this.setState({
                    count: 0,
                    bpm
                });
            } else {
                this.setState({ bpm })
            }
      };
    
      startStop = () => {
        if(this.state.playing) {
            //stop the timer
            clearInterval(this.timer);
            this.setState({
                playing:false
            });
        } else {
            //start a timer with the current BPM
            this.timer = setInterval(
                this.playClick, (60/ this.state.bpm) * 1000
            );
            this.setState(
                {
                    count: 0,
                    playing: true,
                    //play a click ''immediately'' (after setState finishes)
                },
                this.playClick
            );
        }
      }

      playClick = () => {
          const {count, beatsPerMeasure} =this.state;

          //the first beat will have a different sound than the others
          if (count % beatsPerMeasure === 0) {
              this.click2.play();
          } else {
              this.click1.play();
          }

          //keep track of which beat we're on
          this.setState(state => ({
              count: (state.count + 1) % state.beatsPerMeasure
          }));
      }

  render() {

    const { playing, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="30"
            max="340"
            value={bpm}
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
 
}

export default Metronome;