import React,{useState} from 'react';
import {RiCloseLine} from "react-icons/ri"; // close icon 
import "./todomodal.css";

function ToDoModal({ sidebar, setSidebar }) {
    const close = () => {
        setSidebar(false);
      }

  return (
    <div className={sidebar ? 'sidebar active' : 'sidebar'}>
        <div className='sidebar-header'>
          <button className='sidebar-closeBtn' onClick={close}>
              <RiCloseLine size={40} />
            </button>
            <h3 className='sidebar-title'>To Do List</h3>
        </div>
    </div>
  )
}

export default ToDoModal
