import React from 'react'
import './pomodoroTimer.css';
import { useEffect, useRef } from "react"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { IoIosPlayCircle } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaPauseCircle } from "react-icons/fa";
import PlayButton from "../Componenets/PlayButton";




// when play button clicked start the timer
//settings page to set the timer and break
//setting button to access this page 
//fetch the time form the settings page and put into the timer 
const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
}

function PomorodoTimer() {  
  return (
    <div className=" timer">
      <h1> PomorodoTimer </h1>

      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={0} // need to change the timer
          strokeWidth={35}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: 1 })}
          size={500}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>

      <div className='play-button'>
          <IoIosPlayCircle size={100}/>
          <FaPauseCircle size={85}/>
      </div>
      <div className='setting-button'>
        <IoSettings size={50}/>
        <span> Settings </span>
      </div>


    </div>
  )
}

export default PomorodoTimer
