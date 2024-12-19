import React from 'react'
import styles from "./modal.module.css";
//import Aslider from "./slider.module.css";
import {RiCloseLine} from "react-icons/ri"; // close icon 
import ReactSlider from 'react-slider';
import settingsContext from "./settingsContext";
import {useContext} from "react";
import SettingsContext from './settingsContext';



export const Modal = ({closeModal}) => {
  const settingsInfo = useContext(SettingsContext);

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
                <label>Work Minutes:</label>
                <ReactSlider
                  className={styles.slider}
                  thumbClassName={styles.thumb}
                  trackClassName={'track'}
                  value={45}
                  min={1}
                  max={120}  
                /> 
                <lable>Break Minutes:</lable>  
                <ReactSlider
                  className={styles.greenSlider}
                  thumbClassName={styles.greenThumb}
                  trackClassName={'track'}
                  value={5}
                  min={1}
                  max={120}  
                /> 
            </div>

        </div>

        </div>
      
    )
  };


export default Modal
