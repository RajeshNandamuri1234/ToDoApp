import React from 'react';
import TaskButtons from './TaskButtons';
import TaskStatus from './TaskStatus';
import todo from '../../Models/todo' ;


export default function ToDoHeader() {
 
  return (

    <React.Fragment>
   
    <div style={{ backgroundColor: 'white',paddingTop:'25px'  }}>
    <div style={{ color: 'lightgrey', height: '10px', fontSize:'10px', paddingBottom:'5px' }}>
    STEPOUr"
    </div>
    <div style={{ color: 'black', height: '30px', fontWeight:'bold',fontSize:'34px', marginBottom:'30px' }}>
    To-Do List
    </div>
    </div>
     <TaskButtons />
     <div style={{paddingBottom:'10px'}}></div>
     <TaskStatus TodoItem={todo}/>
         
  </React.Fragment>
    
  );
}

