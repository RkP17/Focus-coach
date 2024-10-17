import React from 'react';
import './App.css';
import NavBar from "./Componenets/NavBar"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Calendar from './Pages/Calendar';
import ToDoList from './Pages/ToDoList';
import SiteBlocker from './Pages/SiteBlocker';
import PomorodoTimer from './Pages/PomorodoTimer';

function App() {
  return (
    
    <>
      <Router>
          <NavBar />
        <Routes>
          <Route path= "/"  exact element={<Dashboard />}/>
          <Route path= "/todolist" element={<ToDoList/>}/>
          <Route path= "/calendar" element={<Calendar/>}/>
          <Route path= "/siteblocker" element={<SiteBlocker/>}/>
          <Route path= "/timer" element={<PomorodoTimer/>}/>
        </Routes>
      </Router>
      

     </>
      
     
  );
}

export default App;