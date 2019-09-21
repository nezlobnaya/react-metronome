import React, {useState} from 'react';
import './Metronome.css';


const Metronome = ({count, beatsPerMeasure}) => {

    const[playing, bpm] = useState({
       
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    },[])

    const handleBpmChange = (e) => {
        e.preventDefault();
        console.log(e)
        useState = e.target.value;
    }


    return (
        <div className='metronome'>
            <div className='bpm-slider'>
                <div>{bpm} BPM</div>
                <input 
                    type='range'
                    min='60' 
                    max='240' 
                    value={bpm}
                    onChange={handleBpmChange} />
            </div>
            <button>{playing ? 'Stop' : 'Start'}</button>

        </div>
    )
}


export default Metronome;