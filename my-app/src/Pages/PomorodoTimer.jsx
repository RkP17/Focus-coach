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
import { IoReloadCircle } from "react-icons/io5";
import { set } from 'date-fns';


const renderTime = ({ remainingTime }) => {
  const hours=Math.floor(remainingTime/3600)
  const minutes=Math.floor((remainingTime%3600)/60);
  const seconds=remainingTime%60;

  if (remainingTime === 0) {
    return <div className="timer">Done!</div>;
  }

  return (
    <div className="timer">
      <div className="value">
        {hours > 0 ? `${hours}:` :''}
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}</div>
    </div>
  );
}

function PomorodoTimer() {  
  // Modal
   
  const[showModal, setShowModal] = useState(false);
  const[workMinutes,setWorkMinutes]=useState(25);
  const[breakMinutes,setBreakMinutes]=useState(5);

  const[isPaused,setIsPaused]=useState(true);
  const[isPlaying,setIsPlaying]=useState(false);

  const[mode,setMode]=useState('work'); // work / break

  const [headerText,setHeaderText]=useState("");

  const[secondsLeft,setSecondsLeft]=useState(0);

  const [resetToggle, setResetToggle] = useState(false);

  
  const modeRef=useRef(mode);


  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  
  useEffect(() => {
    setSecondsLeft(workMinutes * 60);
  }, [workMinutes]);

  
  
  function reload() {
   
    setIsPlaying(false);
    setIsPaused(true);
  
    // Temporarily set to a different value, then reset to 25:00
    setSecondsLeft(25*60);
   
  }
    
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
    setIsPlaying(false);
  }

  const closeModal = () => {
    setShowModal(false);
    setIsPaused(false);
  }

  const phrases = [
    "“The question isn’t who is going to let me; it’s who is going to stop me.” ",
    "“Never allow a person to tell you no, who doesn’t have the power to say yes.”",
    "“Whether you think you can or think you can’t, you’re right.” ",
    "“Never confuse a single defeat with a final defeat.” ",
    "“Perseverance is failing 19 times and succeeding the 20th.”",
    "“If you think you are too small to make a difference, try sleeping with a mosquito.”",
    "“You are never too old to set another goal or to dream a new dream.”",
    "“A goal properly set is halfway reached.”",
    "“A goal should scare you a little and excite you a lot.”",

  ];

  

  useEffect ( () => {
    const randomPhrase = phrases[Math.floor(Math.random()*phrases.length)];
    setHeaderText(randomPhrase);

  },[]);

  return (
    <div className=" timer">
      <div class="quoteBox">
      <h3>
        {headerText}
      </h3>
     
    </div>

      <div className="timer-wrapper">
        <CountdownCircleTimer
          key={`${mode}-${workMinutes}-${breakMinutes}`} 
          isPlaying={!isPaused && isPlaying}
          duration={secondsLeft} 
          strokeWidth={40}
          colors={mode === "work" ?  ["#F44336","#ffa500","#ffff00","#f5f5f5"] :["#32cd32","#7fffd4","#66cdaa","#e0ffff"]}
          colorsTime={[10, 6, 2, 0]}
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

        <div className="reload-button">
          <button onClick={reload} className="reload-button">
            <IoReloadCircle size={75} />
          </button>
        </div>

        {/* Play/Pause Buttons */}
        
        <div className="play-button">
          {isPlaying ? (
            <FaPauseCircle 
                size={90}
                onClick = {()=> {
                  setIsPlaying(false);
                  setIsPaused(true);
                }}
              />
          ):(
          <IoIosPlayCircle 
            size={100}
            onClick={() => {
              setIsPlaying(true);
              setIsPaused(false);
            }}
          
          />)}
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
            <IoSettings size={48} />
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