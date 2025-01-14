import React from 'react';
import './App.css';
import NavBar from "./Componenets/NavBar"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PomorodoTimer from './Pages/PomorodoTimer';
//import SettingsContex from './Componenets/settingsContext'
import { BrowserRouter } from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
      <PomorodoTimer />
    </BrowserRouter>   
     
  );
}

export default App;