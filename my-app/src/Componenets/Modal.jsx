import React from 'react'
import styles from "./modal.module.css";
//import Aslider from "./slider.module.css";
import {RiCloseLine} from "react-icons/ri"; // close icon 
import ReactSlider from 'react-slider';
import settingsContext from "./settingsContext";
import {useContext} from "react";
import SettingsContext from './settingsContext';



export const Modal = ({closeModal,setUrl}) => {
  //const settingsInfo = useContext(SettingsContext);
  const { workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes } = useContext(SettingsContext);
  

    return(
        <div className={styles.modalBack}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
                <h2>Settings</h2>
                <button onClick={closeModal} className={styles.modalCloseBtn}>
                <RiCloseLine size={24} />
                </button>
            </div>
            <div className={styles.modalBody}>
                <label>Work : {workMinutes}:00</label>
                <ReactSlider
                  className={styles.slider}
                  thumbClassName={styles.thumb}
                  trackClassName={'track'}
                  value={workMinutes}
                  onChange={(value) => setWorkMinutes(value)}
                  min={1}
                  max={120}  
                /> 
                <lable>Break : {breakMinutes}:00</lable>  
                <ReactSlider
                  className={styles.greenSlider}
                  thumbClassName={styles.greenThumb}
                  trackClassName={'track'}
                  value={breakMinutes}
                  onChange={(value)=>setBreakMinutes(value)}
                  min={1}
                  max={120}  
                /> 
            </div>

            <div className='Music-settings'>
              <h3>Spotify</h3>
              {/* Input for spotify if not then default is youtube video*/}
              <input 
                className='Spotify-url' 
                type='text' 
                placeholder='Enter Spotify URL' 
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>


        </div>

        </div>
      
    )
  };


export default Modal
