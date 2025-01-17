import React,{useState,useEffect,useRef} from 'react';
import {RiCloseLine} from "react-icons/ri"; // close icon 
import "./todomodal.css";
import { IoAdd } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

import { FaRegCircle } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";




function ToDoModal({ sidebar, setSidebar }) {
    // inputs 
    const[input, setInput]=useState('');
    // all the to dos
    const[todos,setTodos]=useState([]);
    //edits
    const[editIndex,setEditIndex]=useState(null);
    const[editTask,setEditTask]=useState('');
    //complete
    
    const[complete,setComplete]=useState([]);
    const[isHover,setIsHover]=useState(false);

    const timeouts = {};

    React.useEffect(() => {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }, []);

    
    
    const close = () => {
      setSidebar(false);
    }

    const handleChange = e => {
      setInput(e.target.value);
    }
    // whatever is types in will create the task 
    const handleSubmit = e => {
      e.preventDefault();
      // add to the to do's
      if (input.trim() === '') return;
      setTodos([...todos,input]);
      setComplete([...complete,false]);
      console.log(...todos);
      setInput('');
      localStorage.setItem('todos',JSON.stringify([...todos,input]));
      
    }
    

    const handleEdit = (index) => {
      setEditIndex(index);
      setEditTask(todos[index]);
    }

    const handleSave =(index)=>{
      const updatedTodos=[...todos];
      updatedTodos[index]=editTask;
      setTodos(updatedTodos);
      setEditIndex(null);
      setEditTask('');

      localStorage.setItem('todos',JSON.stringify(updatedTodos));

    }
    
    const handleComplete = (index) => {
      const updatedCompletd=[...complete];
      updatedCompletd[index]=!updatedCompletd[index];
      setComplete(updatedCompletd);
      

      if(updatedCompletd[index]){
        timeouts[index] = setTimeout(() => {
          const newTodos=[...todos];
          const newComplete=[...complete];

          newTodos.splice(index,1);
          newComplete.splice(index,1);

          setTodos(newTodos);
          setComplete(newComplete);

        },6000)
      }else{
        clearTimeout(timeouts[index]);
        delete timeouts[index];
      }

    }

    const handleDelete = index => {
      const newTodos= [...todos]
      const newComplete=[...complete]
      newTodos.splice(index,1) //start at that index and remove that 1 item 
      newComplete.splice(index,1)
      setTodos(newTodos)
      setComplete(newComplete)

      localStorage.setItem('todos',JSON.stringify(newTodos));
      
      if (timeouts[index]) {
        clearTimeout(timeouts[index]);
        delete timeouts[index];
      }

    }


  return (
    <div className={sidebar ? 'sidebar active' : 'sidebar'}>
        <div className='sidebar-header'>
            <h3 className='sidebar-title'>To Do List</h3>
            <button className='sidebar-closeBtn' onClick={close}>
              <RiCloseLine size={40} />
            </button>
        </div>
        <form className='todo-form'>
            <input 
              className='todo-input'
              placeholder='Add task'
              type='text' 
              value={input}
              onChange={handleChange}
            />
            {/* Add button */}
            <button className='todo-add' onClick={handleSubmit} >
              <IoAdd 
                size={33}
              />
            </button>

        </form>
        {/* show the to do */} {/* delete task button */}{/* edit */}
        <div className='todo-tasklist'>
          {todos.map((todo,index)=>(
            <li className={`todo-task ${complete[index] ? 'completed' : ''}`} key={index}>
              <button 
                className='todo-complete' 
                onClick={() => handleComplete(index)}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                data-tooltip="Complete Task"
              >
                {complete[index] ? <MdOutlineDone size={25}/> : <FaRegCircle size={20}/>}
                
              </button> 
            {editIndex === index ? ( 
              <>
                <input
                  className='todo-edit-task'
                  type='text'
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button
                  className='todo-save'
                  onClick={() => handleSave(index)}
                >
                  Save
                </button>
              </>

              ) : (
                <>
                  {todo}
                  <button className='todo-edit' onClick={() => handleEdit(index)}>
                    <FaRegEdit
                      size={20}
                    />
                  </button>
                  <button className='todo-delete' onClick={() => handleDelete(index)}>
                    <AiOutlineDelete
                      size={20}
                    />
                  </button>
                  
                </>
                
              )}
              

            </li>

          ))}

        </div>  
    </div>
    
  )
}

export default ToDoModal
