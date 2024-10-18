import React from 'react'
import './pomodoroTimer.css';
import { useEffect, useRef } from "react"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { IoIosPlayCircle } from "react-icons/io";
import PlayButton from "../Componenets/PlayButton";

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
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: 1 })}
          size={500}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>

      <div className='play-button'>
        <PlayButton>
          <IoIosPlayCircle />

        </PlayButton>
      
      </div>

    </div>
  )
}

export default PomorodoTimer
