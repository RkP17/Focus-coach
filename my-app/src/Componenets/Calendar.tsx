import React from 'react';
import styles from './calendar.module.css';
import {RiCloseLine} from "react-icons/ri"; // close icon 
import {ScheduleXCalendar,useCalendarApp} from "@schedule-x/react";
import {createViewWeek,createViewMonthGrid, CalendarApp} from "@schedule-x/calendar";
import '@schedule-x/theme-default/dist/calendar.css'

export const Calendar = ({close}) => {
    const calendar :CalendarApp = useCalendarApp({
        views: [createViewWeek(),createViewMonthGrid()],
        events: [
            {
            id: 1,
            title: 'Event',
            start: '2025-01-04 10:05',
            end: '2025-01-04 10:35',
            },
        ],
        selectedDate:'2025-01-04'

    });

    
    calendar.setTheme('dark')

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
                    <ScheduleXCalendar calendarApp={calendar} />
                </div>
            </div>

        </div>
    )

}

export default Calendar;