import React, {useState} from 'react'
import './pomodoroTimer.css';
import { useEffect, useRef } from "react"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { IoIosPlayCircle } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaPauseCircle } from "react-icons/fa";
import PlayButton from "../Componenets/PlayButton.js";
import {Modal} from "../Componenets/Modal.jsx";
//import Modal from "src/Componenets/Modal.js";



// when play button clicked start the timer
//settings page to set the timer and break
//setting button to access this page 
//fetch the time form the settings page and put into the timer 
const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Done!</div>;
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
}


function PomorodoTimer() {  
  // Modal
  const[showModal, setShowModal] = useState(false);


  

  return (
    <div className=" timer">
      <h1> PomorodoTimer </h1>

      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={0} // need to change the timer
          strokeWidth={10}
          colors={["#004777", "#F7B801", "#A30000", "#ffffff"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
          size={400}                      // ^^ go to change
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>

      <div className="buttons-container">
        {/* Play/Pause Buttons */}
        <div className="play-button">
          <IoIosPlayCircle size={80} />
          <FaPauseCircle size={70} />
        </div>

        {/* Settings Button */}
        <div className="settings-container">
          <button onClick={() => setShowModal(true)} className="setting-button">
            <IoSettings size={60} />
          </button>
        </div>
        {/* Modal */}
        {showModal && <Modal closeModal={() => setShowModal(false)} />}
        
      </div>

    </div>
    
  );
}

export default PomorodoTimer
