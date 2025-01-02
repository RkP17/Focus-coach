import React, {useState} from 'react'
import './pomodoroTimer.css';
import { useEffect, useRef } from "react"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { IoIosPlayCircle } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaPauseCircle } from "react-icons/fa";
import PlayButton from "../Componenets/PlayButton.js";
import {Modal} from "../Componenets/Modal.jsx";
import SettingsContext from '../Componenets/settingsContext'
import soundFile from '../Componenets/mixkit-relaxing-bell-chime-3109.wav';

//import Modal from "src/Componenets/Modal.js";

// make the time show on the screen 
// be able to press play once enteringf the screen 
// make settings button look better (\_ - - _/)
// sort the break out aswell
// once the timer is fincished fo straigfht onto the break but stay paused
// when we start the timer then pause na dchange the timer it doesn't change to the 40:00 it changes to 39:20 like it takes the seconds off from the prev


const renderTime = ({ remainingTime }) => {

  const minutes=Math.floor(remainingTime/60);
  const seconds=remainingTime%60;

  if (remainingTime === 0) {
    return <div className="timer">Done!</div>;
  }

  return (
    <div className="timer">
      <div className="value">{minutes}:{seconds<10 ? `0${seconds}` : seconds}</div>
    </div>
  );
}

function PomorodoTimer() {  
  // Modal
  const[showModal, setShowModal] = useState(false);
  const[workMinutes,setWorkMinutes]=useState(25);
  const[breakMinutes,setBreakMinutes]=useState(5);

  const[isPaused,setIsPaused]=useState(false);
  const[isPlaying,setIsPlaying]=useState(false);

  const[mode,setMode]=useState('work'); // work / break

  const[secondsLeft,setSecondsLeft]=useState(0);
  const modeRef=useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  
  useEffect(() => {
    setSecondsLeft(workMinutes * 60);
  }, [workMinutes]);
  

  
  // create the fiunction switch mode 
  function switchMode(){
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    setMode(nextMode);
    setSecondsLeft(nextMode === 'work' ? workMinutes * 60 : breakMinutes * 60);
  }

  function playSound() {
    const audio = new Audio(soundFile);
    audio.play();
  }


  function openModal() {
    setShowModal(true);
    setIsPaused(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setIsPaused(false);
  }

  return (
    <div className=" timer">
      <h1> PomorodoTimer </h1>

      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying={!isPaused && isPlaying}
          duration={secondsLeft} // need to change the timer
          key={mode}
          strokeWidth={40}
          colors={["red", "#F7B801", "#A30000", "#ffffff"]}
          colorsTime={[6, 3, 0]}
          onComplete={() => {
            switchMode();
            setIsPlaying(false);
            playSound();
            return {shouldRepeat:false,delay:20};
          }}
          size={400}                      // ^^ go to change
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>

      <div className="buttons-container">
        {/* Play/Pause Buttons */}
        <div className="play-button">
          <IoIosPlayCircle 
            size={80}
            onClick={() => {
              setIsPlaying(true);
              setIsPaused(false);
            }}

           />
          <FaPauseCircle 
            size={70}
            onClick = {()=> {
              setIsPlaying(false);
              setIsPaused(true);
            }}
           />
        </div>

        {/* Settings Button */}
        <SettingsContext.Provider value={{
          workMinutes,
          setWorkMinutes,
          breakMinutes,
          setBreakMinutes,
        }}>
        <div className="settings-container">
          <button onClick= {openModal} className="setting-button">
            <IoSettings size={60} />
          </button>
        </div>
        {/* Modal */}
        {showModal && <Modal closeModal={closeModal} />}
        </SettingsContext.Provider>
        
        
      </div>

    </div>
    
  );
}

export default PomorodoTimer

//<settingsContext.Provider value={{
  //workMinutes: 45,
  //breakMinutes: 15,
//}}>