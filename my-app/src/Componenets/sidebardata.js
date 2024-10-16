import React from 'react';
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
//import * as IoIcons from 'react-icons/io';
import { TfiCheckBox,TfiCalendar} from "react-icons/tfi";

import { FaClock } from "react-icons/fa";


export const SidebarData = [
    {
        title: 'DashBoard',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
      },
  {
    title: 'To Do List',
    path: '/src/Pages/ToDoList.js',
    icon: <TfiCheckBox />,
    cName: 'nav-text'
  },
  {
    title: 'Calendar',
    path: '/src/Pages/Calendar.js',
    icon: <TfiCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Pomodoro Timer',
    path: '/src/Pages/PomorodoTimer.js',
    icon: <FaClock />,
    cName: 'nav-text'
  },
  {
    title: 'SiteBlocker',
    path: '/src/Pages/SiteBlocker.js',
    icon: <TfiCalendar />,
    cName: 'nav-text'
  },
 
];