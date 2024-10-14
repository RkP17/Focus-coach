import React from 'react';
import './App.css';
import NavBar from "./Componenets/NavBar.js"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    
    <>
      <Router>
          <NavBar />
        <Routes>
          <Route paths= "/" element={<h2>Home Page</h2>}/>
        </Routes>
      </Router>
      

     </>
      
     
  );
}

export default App;