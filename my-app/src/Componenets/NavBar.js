import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom"
import { SidebarData } from './sidebardata';
import './navbar.css';
import { IconContext } from 'react-icons/lib';



/* faBars is the icon*/
/* if sidebar is open then  this closes, if closes then this opens it */
function NavBar() {
    const[sidebar,setSidebar]= useState(false);

    const showSidebar = () => setSidebar(!sidebar) ;

  return (
    <>
    <IconContext.Provider value={{ color: '#000000' }}>
      <div className = "navbar"> 
          <Link to="#" className= 'menu-bars'>
          <FaIcons.FaBars onClick={showSidebar}/>
          </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                
                <AiIcons.AiOutlineClose />
                </Link>
            </li>
            {/* Iterates over the sidebar items to generate a list of items  */}
            {SidebarData.map((item, index)=> {
              return (
                <li key={index} className={item.cName}> {/* Key={index} used to uniquely identify the items   */}
                  <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
      </IconContext.Provider>
    </>  
  );
}

export default NavBar
