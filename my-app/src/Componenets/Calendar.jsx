import React from 'react';
import styles from './calendar.module.css';
import {RiCloseLine} from "react-icons/ri"; // close icon 

//Calendar 
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { CalendarContainer } from 'react-datepicker';


// month view, week view, day view, schedule view
// be able to add events aswell 

export const CalendarCoponent = ({close}) => {
    const calendarRef = React.createRef();
    
    return (
        <div className={styles.modalBack}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2>Calendar</h2>
                    <button onClick={close} className={styles.modalCloseBtn}>
                    <RiCloseLine size={24} />
                    </button>
                </div>
                    <Calendar
                        ref={calendarRef}
                        height="800px"
                        view="month" // Options: month, week, day
                        useDetailPopup={true}
                        useFormPopup={true}
                        calendars={[
                        {
                            id: "1",
                            name: "Personal",
                            color: "#ffffff",
                            bgColor: "#ff5583",
                            dragBgColor: "#ff5583",
                            borderColor: "#ff5583",
                        },
                        ]} 
                        template= {{
                            monthDayname: function(dayname){
                              return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
                            }
                        }}
                        
                    />

            </div>

        </div>
    )

}

export default CalendarCoponent;