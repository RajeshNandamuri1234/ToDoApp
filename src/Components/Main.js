import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header/ToDoHeader';
import Divider from '@material-ui/core/Divider';
import TodoList from './List/TodoList';
import todo from '../Models/todo' ;
import TextField from '@material-ui/core/TextField';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Category from '../Models/Category';
import { FormControl } from '@material-ui/core';
import useStyles from "./MainCss";
import MenuEnter from './MenuEnter'
import MenuLeave from './MenuLeave'
import AppDialogBox from '../Components/Dialogs/DialogBox';
import ChangeStatus from './ChangeStatus';
import Container from '@material-ui/core/Container';


export default function Main() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [todoTasks,setTasks]=React.useState(todo);
  const [Taskstatus, setTaskstatus] = React.useState("ALL");

  
  let taskLeft="";
  
  const handleClose = () => {
  
    setOpen(false);
  };

  
 
const statusTasks = (status) => {
    
  let viewTodoTasks=[];
  if(status==="ALL")
    viewTodoTasks=todo; 
  else if(status==="ONGOING")
  {
    todo.map((Item)=>{
      if(Item.completed===false)
      viewTodoTasks.push(Item)
    })
   
  }
  else if(status==="COMPLETED")
  {
    todo.map((Item)=>{
      if(Item.completed===true)
      viewTodoTasks.push(Item)
    })
  }
  setTasks(viewTodoTasks)
};
  


  const UpdateStatus=((ItemID)=>{

    if(window.confirm("Are you sure to update task as complete"))
     {
    todo.map((Item)=>{
      if(Item.id===ItemID)
      Item.completed=true;
    })
    
    if(Taskstatus==="ALL")
    setTaskstatus("COMPLETED")
    else
    setTaskstatus("ALL")
   }

 
  })

  const DeleteToDo=((ItemID)=>{
     if(window.confirm("Are you sure want to delete a task"))
     {
      
      for(var i=0;i<todo.length;i++){
        if(todo[i].id===ItemID)
        {
          todo.splice(i,1)
        }

      }
      if(Taskstatus==="ALL")
      setTaskstatus("COMPLETED")
      else
      setTaskstatus("ALL")
    }
    
    
  })


  let taskLeftCount=0;
  todo.map((Item)=>{
    if(Item.completed==false)
    taskLeftCount++;
  })
  taskLeft=taskLeftCount+" tasks left"
 

 
  const addTask = (Item) => {

    if(document.getElementById('txtAddTask').value=="")
    {
     alert("Please enter task in 'Whats needed to be done' text box")
     setOpen(false);

    }
    var todoCount=todo.length+1;

    var metadata={
      id: todoCount,
      name:document.getElementById('txtAddTask').value,
      completed: false,
      category: Item.category,
      Color: Item.Color
    }

    todo.push(metadata);
    document.getElementById('txtAddTask').value="";
    setOpen(false);

  };

  const buttonItems=Category.map((Item)=>
  <React.Fragment>
    <tr style={{paddingBottom:'10px'}}><td>
     <div className={classes.ButtonBackground} style={{backgroundColor:Item.Color}}></div>
      <div className={classes.CategoryMenu} menuColor={Item.Color} onMouseEnter={MenuEnter}
             onMouseLeave={MenuLeave}  onClick={()=>addTask(Item)} id={Item.Name}  > 
          <span >{Item.Name}</span>
      </div>
  </td></tr>
  </React.Fragment>
  );

  const AddTaskItem=  
    <React.Fragment>
      <div style={{float:'left',width:'8%',padding:'20px'}} id='divChkBox'>
      <a onClick={()=>setOpen(true)}><CheckBoxOutlineBlankIcon/></a>
      </div> 
      <div style={{width:'92%',float:'right'}}>
      <TextField id="txtAddTask"  fullWidth label="What's needed to be done ?" />
      </div> 
      </React.Fragment> 
    
  

  return (

    <React.Fragment>
    <CssBaseline />
     <Header/>
     <Divider/>
     <Container maxWidth="sm" style={{paddingTop:'5px'}}>
      {AddTaskItem}
      <TodoList Items={todoTasks} onStatusChange={UpdateStatus} onDelete={DeleteToDo}/>
      <ChangeStatus TasksLeft={taskLeft} StatusTasks={statusTasks}></ChangeStatus>
     </Container>

     <AppDialogBox Title="Add New Task"  Open={open} Margin={classes.margin} HandleClose={handleClose} AddButton="">
        <form className={classes.form} noValidate>
        <FormControl className={classes.formControl}>
          <table >{buttonItems}
          </table>
        </FormControl>
       </form>
    </AppDialogBox>
     
    </React.Fragment>
    
  );
}