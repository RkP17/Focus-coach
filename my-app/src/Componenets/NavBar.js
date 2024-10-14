import React from 'react'
import * as FaIcons from "react-icons/fa";
import {Link} from "react-router-dom"

/* faBars is the icon*/

function navbar() {
  return (
    <>
    <div classname = "navbar"> 
        <Link to="a" classname= 'menu-bars'>
        <FaIcons.FaBars/>
        </Link>
    
      
      </div>
    </>
    
  )
}

export default navbar
