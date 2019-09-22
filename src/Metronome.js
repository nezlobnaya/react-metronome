import React, { useState, useReducer } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';


function Metronome () {
    const [count, setCount] = useState({count: 0});
    const [playing, setPlaying] =useState({playing: false});
    const [bpm, setBpm] = useState ({bpm: 100});
    const [beatsPerMeasure, setNewBeatsPerMeasure] = useState({beatsPerMeasure: 4});
       
       const clickOne = new Audio(click1);
       const clickTwo = new Audio(click2);
    

    function handleBpmChange (event, timer, playClick) {
            const bpm = event.target.value;

            if (playing) {
                //stop the old timer and start a new one
                clearInterval(timer);
                    timer =setInterval(playClick, (60/bpm) *1000);

                //set the new bpm, and reset the beat counter
                setBpm({count: 0,bpm });
            } else {
                setBpm()
            }
      };

      function playClick(beatsPerMeasure) {
          

        //the first beat will have a different sound than the others
        if (count % beatsPerMeasure === 0) {
            clickTwo.play();
        } else {
            clickOne.play();
        }

        //keep track of which beat we're on
        setCount(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    }

    
      function startStop (timer)  {
        if(playing) {
            //stop the timer
            clearInterval(timer);
                setPlaying({playing:false});
        } else {
            //start a timer with the current BPM
                timer = setInterval(playClick, (60/ bpm) * 1000);
            setPlaying(
                {
                  count: 0,
                  playing: true,
                    //play a click ''immediately'' (after setState finishes)
                },
                playClick
            );
        }
      }


 

    // const[playing, bpm] = useState();

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div> {bpm} BPM</div>
          <input
            type="range"
            min="30"
            max="340"
            value={bpm}
            onChange={handleBpmChange} />
        </div>
        <button onClick={startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  
 
}

export default Metronome;