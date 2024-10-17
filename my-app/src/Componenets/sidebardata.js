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
    path: '/todolist',
    icon: <TfiCheckBox />,
    cName: 'nav-text'
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: <TfiCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Pomodoro Timer',
    path: '/timer',
    icon: <FaClock />,
    cName: 'nav-text'
  },
  {
    title: 'SiteBlocker',
    path: '/siteblocker',
    icon: <TfiCalendar />,
    cName: 'nav-text'
  },
 
];