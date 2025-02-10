/* global chrome */

import React, {useState} from 'react'
import './pomodoroTimer.css';
import { useEffect, useRef } from "react"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { CiPlay1 } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { IoReload } from "react-icons/io5";
import {Modal} from "../Componenets/Modal.jsx";
import SettingsContext from '../Componenets/settingsContext'
import soundFile from '../Componenets/mixkit-relaxing-bell-chime-3109.wav';
import { VscTasklist } from "react-icons/vsc";
import ToDoModal from "../Componenets/ToDoModal.js";
import { FaCalendarAlt } from "react-icons/fa";
import {Calendar} from "../Componenets/Calendar.jsx"
import axios from 'axios'; // for spotify
import { BiSolidCommentError } from 'react-icons/bi'; // Correct import for BiSolidCommentError


const renderTime = ({ remainingTime }) => {
  const hours=Math.floor(remainingTime/3600)
  const minutes=Math.floor((remainingTime%3600)/60);
  const seconds=remainingTime%60;


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

  const[showCalendar,setShowCalendar]=useState(false);

  const [remainingTime, setRemainingTime] = useState(workMinutes * 60);
  const [timerKey, setTimerKey] = useState(0);

  const modeRef=useRef(mode);
  
  const videoURL = "https://www.youtube.com/embed/TtkFsfOP9QI";

  // postify
  const[url,setUrl] = React.useState(''); // for spotify url
  const[playlist,setPlaylist]=React.useState(null); // for spotify playlist

  const[input,setInput]=useState('');
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    setRemainingTime(workMinutes * 60);
    setTimerKey((prev) => prev + 1);
  }, [workMinutes]);
/*
    // In your React app, use chrome.storage to set the timer state
  useEffect(() => {
    // Save the timer state in chrome storage when it changes
    chrome.storage.local.set({ timerIsPlaying: isPlaying });
  }, [isPlaying]);
*/

  useEffect(() => {
    // Update localStorage whenever the timer state changes
    localStorage.setItem('timerIsPlaying', JSON.stringify(isPlaying));
    console.log("Saved:",isPlaying);
  }, [isPlaying]);

    
  // fetch the spotify playlist
  const fetchPlaylist = async () => {
    const token = 'BQCw5ejmJcWE3fGu4pnDQPAGdAzsuv-3YkHOW1ucAilEQFI8sCqpHlDu4Emj0_efvqD300CLRQIixhC64Eq-QoQa0ECQHnt1v3pJ3B2yPJ2xzoR-GVDQtlzoplOKv5EGeiYRHmunHgQKVZB-tcep-34-MCcKcB8qDnnQdceZaDImFR5Tde6q7eH4Uomhps6iBxQSNRnYzyonJf2tDTQK_suLlRmD8X9Yk-qcq9sxEbmV4pJc9KDnndHB6SXwLruRzqQ0rMvUXjw9a3rOTdCRRXDsvw6Mc7vimKtXvOAsf8PTwEwrlHaws1lS';
    const playlistId = url.split('/').pop(); // the format of the spotify url just need the last aprt of the url

    try{
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylist(response.data);
    }catch(error){
      console.error("failed to fetch the playlist")
      console.error(error);
    }
  }


  // fetch the playlist when the url changes
  useEffect(() => {
    if(url && url.includes('spotify.com')){
      fetchPlaylist();
    }
  },[url]);

  // Determine the media URL
  const mediaSrc = url.includes("spotify.com")
    ? `https://open.spotify.com/embed/playlist/${url.split('/').pop()}`
    : "https://www.youtube.com/embed/phRZKH1tQsQ"; // default to YouTube if no Spotify URL


  // create the fiunction switch mode 
  function switchMode(){
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    setMode(nextMode);
    const newTime = nextMode === "work" ? workMinutes * 60 : breakMinutes * 60;
    setRemainingTime(newTime);
    setIsPaused(true);
    setIsPlaying(false);
    setTimerKey((prev) => prev + 1);
    
  }

  const reload = () => {
    const resetTime = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;
    setRemainingTime(resetTime);
    
    setIsPaused(true);
    setIsPlaying(false);
    setTimerKey((prev) => prev + 1);
  };


  function playSound() {
    const audio = new Audio(soundFile);
    audio.play();
  }
  

  const closeModal = () => {
    setShowModal(false);
    setIsPaused(false);
  }

  //close calendar 
  const close =() => {
    setShowCalendar(false);

  }
  // To do list --->
  const[sidebar,setSidebar]=useState(false);

  

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
    "“Make each day your masterpiece.”",
    "“​​We will fail when we fail to try.”",
    "“The only way to do great work is to love what you do.”",
    "'It always seems impossible until it's done.'",
    "“You can fool everyone else, but you can’t fool your own mind.”",
    "“Don’t let yesterday take up too much of today.”",
    "“We will either find a way or make one.” ",
    "“The man who moves a mountain begins by carrying away small stones.“",
    "“Success is the progressive realization of a worthy goal or ideal.”",

  ];

  

  useEffect ( () => {
    const randomPhrase = phrases[Math.floor(Math.random()*phrases.length)];
    setHeaderText(randomPhrase);

  },[]);

  return (
    <div className=" timer">
      <div className = "app-name"> 
        <h1>
          Focus Coach
        </h1>
      </div>


      <div className='navbars'>
        <FaCalendarAlt className='calendar-icon'
          size={42}
          onClick={() => {
            setShowCalendar(true);
          }}
        />
        <VscTasklist className="task-icon" 
          size={55} 
          onClick={() => {
            setSidebar(true);
          }}/>
          
        
      </div>
      {showCalendar && <Calendar close = {close} />}
      {sidebar && <ToDoModal sidebar={sidebar} setSidebar={setSidebar} />}

    <div class="quoteBox">
      <h3>
        {headerText}
      </h3>
     
      </div>

      <div className="TimerTask">
        <input
          className="task-input"
          placeholder='What do you want to focus on in this session?'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          
        />
        
      </div>

      <div className="timer-wrapper">
        <CountdownCircleTimer 
          className={`lofi-video-iframe ${mode === 'work' ? 'work-border' : 'break-border'}`}
          isPlaying={!isPaused && isPlaying}
          duration={remainingTime} 
          initialRemainingTime={remainingTime}
          key={timerKey} 
          strokeWidth={15}
          colors={mode === "work" ?  ["#F44336","#ffa500","#ffff00","#f5f5f5"] :["#76c976","#7fffd4","#66cdaa","#e0ffff"]}
          colorsTime={[10, 6, 2, 0]}
          onComplete={() => {
            switchMode();
            setIsPlaying(false);
            playSound();
            
            return {shouldRepeat:false};
          }}
          size={420}   
          
      
        >
          {renderTime}
        </CountdownCircleTimer>

        <div className="buttons-container">

          <div className="reload-button">
      
              <IoReload 
                size={50} 
                onClick={reload}
                
                
              />
            
          </div>

          {/* Play/Pause Buttons */}
          
          <div className="play-button">
            {isPlaying ? (
              <CiPause1 
                  size={40}
                  onClick = {()=> {
                    setIsPlaying(false);
                    setIsPaused(true);
                  }}
                  
                  
                />
            ):(
            <CiPlay1
              size={50}
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
            
              <CiSettings className='settings-button'
                size={55}
                onClick={() => {
                  setShowModal(true);
                  setIsPaused(true);
                  setIsPlaying(false); 
                }}
                
                />
            
          </div>

          {/* Modal */}
          {showModal && <Modal closeModal={closeModal} setUrl={setUrl} />}
          </SettingsContext.Provider>
          
          
        </div>
      </div>
      
      
      {/*<div className={`lofi-video-iframe ${mode === 'work' ? 'work-border' : 'break-border'}`}>*/}
        
      <div className={`media-container-iframe ${mode === "work" ? "work-border" : "break-border"}`}>
        <iframe
          src={`${mediaSrc}?autoplay=${isPlaying ? 1 : 0}`}
          title="Media Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
          
        ></iframe>
      </div>

    </div>
    
  );
}

export default PomorodoTimer

//<settingsContext.Provider value={{
  //workMinutes: 45,
  //breakMinutes: 15,
//}}>