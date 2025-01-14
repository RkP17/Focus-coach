import React from 'react';
import './App.css';
import NavBar from "./Componenets/NavBar"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PomorodoTimer from './Pages/PomorodoTimer';
//import SettingsContex from './Componenets/settingsContext'

function App() {
  
  return (
    <div>
      <PomorodoTimer />
    </div>     
     
  );
}

export default App;