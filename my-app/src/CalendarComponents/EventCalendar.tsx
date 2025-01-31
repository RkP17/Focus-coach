import {useState,MouseEvent} from 'react';
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider } from "@mui/material"

import { Calendar, type Event, dateFnsLocalizer } from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"

import "react-big-calendar/lib/css/react-big-calendar.css"

import EventInfo from "./EventInfo.tsx"
import AddEventModal from "../CalendarComponents/AddEventModal.tsx"
import EventInfoModal from "../CalendarComponents/EventInfoModal"
import AddDatePickerEventModal from "./AddDatePickerEventModal"
