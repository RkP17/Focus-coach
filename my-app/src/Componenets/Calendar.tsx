import React from 'react';
import styles from './calendar.module.css';
import {RiCloseLine} from "react-icons/ri"; // close icon 


import '@schedule-x/theme-default/dist/calendar.css'

export const Calendar = ({close}) => {
   

    return (
        <div className={styles.modalBack}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2>Calendar</h2>
                    <button onClick={close} className={styles.modalCloseBtn}>
                    <RiCloseLine size={24} />
                    </button>
                </div>
                <div>
                    
                </div>
            </div>

        </div>
    )

}

export default Calendar;