import React from 'react';
import styles from './calendar.module.css';
import {RiCloseLine} from "react-icons/ri"; // close icon 
import {createCalendar, createViewMonthGrid} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

export const Calendar = ({close}) => {
    const calendar= createCalendar ({
        views: [createViewMonthGrid()],
        events:[
            {
                id:1,
                title:'Coffee',
                start:'2023-12-04 10:05',
                end: '2023-12-04 10:35',
            },
        ],
    })
    return (
        <div className={styles.modalBack}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2>Calendar</h2>
                    <button onClick={close} className={styles.modalCloseBtn}>
                    <RiCloseLine size={24} />
                    </button>
                </div>

            </div>

        </div>
    )

}

export default Calendar;