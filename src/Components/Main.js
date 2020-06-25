import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Header from './Header/ToDoHeader';
import Divider from '@material-ui/core/Divider';
import TodoList from './List/TodoList';
import todo from '../Models/todo' ;
import TextField from '@material-ui/core/TextField';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Category from '../Models/Category';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import { Card,Dialog,DialogContent,DialogTitle,FormControl,DialogActions } from '@material-ui/core';


const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#f77062"),
    backgroundColor: "#f77062",
    '&:hover': {
      backgroundColor: "#f77062",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root:{
   display:'flex',
   height:'40px !important',
  
   
  },
  margin: {
    margin: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  anchorMenu:{
    color:'#f77062',
    backgroundColor:'white',
    padding:'20px',
    fontSize:'14px',
    fontWeight:'bold',
    
  },
   anchorSelected:{
    color:'White',
    backgroundColor:'#f77062',
    padding:'20px',
    fontSize:'14px',
    fontWeight:'bold',
    

  },
  CategoryMenu:{
    height:'25px',
    fontSize:'12px',
    textAlign:'center',
    fontWeight:'bold'
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
    
  },
});


export default function Main() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [todoTasks,setTasks]=React.useState(todo);
  const [Taskstatus, setTaskstatus] = React.useState("ALL");
  const [scroll, setScroll] = React.useState('body');
  let taskLeft="";

  

  const viewTasks = (status) => {
       
    
    let viewTodoTasks=[];
    if(status=="ALL")
    {
      
      viewTodoTasks=todo; 
      document.getElementById("allAnchor").className=classes.anchorSelected;
      document.getElementById("onGoingAnchor").className=classes.anchorMenu;
      document.getElementById("completedAnchor").className=classes.anchorMenu;
      
    }
    else if(status=="ONGOING")
    {
      
      todo.map((Item)=>{
        if(Item.completed==false)
        viewTodoTasks.push(Item)
      })
      document.getElementById("allAnchor").className=classes.anchorMenu;
      document.getElementById("onGoingAnchor").className=classes.anchorSelected;
      document.getElementById("completedAnchor").className=classes.anchorMenu;
     
    }
    else if(status=="COMPLETED")
    {
      
      todo.map((Item)=>{
        if(Item.completed==true)
        viewTodoTasks.push(Item)
      })

      document.getElementById("allAnchor").className=classes.anchorMenu;
      document.getElementById("onGoingAnchor").className=classes.anchorMenu;
      document.getElementById("completedAnchor").className=classes.anchorSelected;
      
    }
    
    setTasks(viewTodoTasks)
  };


  const UpdateStatus=((ItemID)=>{

    if(window.confirm("Are you sure to update task as complete"))
     {
    todo.map((Item)=>{
      if(Item.id==ItemID)
      Item.completed=true;
    })
    
    if(Taskstatus=="ALL")
    setTaskstatus("COMPLETED")
    else
    setTaskstatus("ALL")
   }

   // setTasks(todo)
    //let viewTodoTasks=[];
    //viewTodoTasks=todo; 
    //setTasks(viewTodoTasks)
    //alert("Hello")
  })

  const DeleteToDo=((ItemID)=>{
     if(window.confirm("Are you sure want to delete a task"))
     {
      var allTodoTasks=todo;

      for(var i=0;i<todo.length;i++){
        if(todo[i].id==ItemID)
        {
          todo.splice(i,1)
        }

      }
      if(Taskstatus=="ALL")
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


  const menuEnter=(e)=>{
    
   
   
    var menuid=e.target.getAttribute("id");
    if(menuid!=null)
    {
    var color=e.target.parentElement.getAttribute('menucolor');
    
    document.getElementById(menuid).style.backgroundColor=color;
    document.getElementById(menuid).style.color="White";
   }
     
   }
   const menuLeave=(e)=>{
     
     var menuid=e.target.getAttribute("id");
     if(menuid!=null)
    {
     document.getElementById(menuid).style.backgroundColor="white";
     document.getElementById(menuid).style.color="black";
    }
      
      
    }
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

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
  <div style={{width:'5px',height:'25px',float:'left',display:'block',backgroundColor:Item.Color}}></div>
  <div className={classes.CategoryMenu} onMouseEnter={menuEnter} onMouseLeave={menuLeave} onClick={()=>addTask(Item)} id={Item.Name}  >
    <span >{Item.Name}</span>
  </div>
  </td></tr>
  </React.Fragment>
     
  );
  return (

    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      <Typography component="div" style={{ backgroundColor: 'white', height: '32vh',paddingTop:'10px' }} >
      <Header/>
      </Typography>
    </Container>
     <Divider/>
     <Container maxWidth="sm" style={{paddingTop:'5px'}}>
    <div style={{float:'left',width:'8%',padding:'20px'}} id='divChkBox'>
     <a onClick={handleClickOpen}><CheckBoxOutlineBlankIcon/></a>
     </div> 
     <div style={{width:'92%',float:'right'}}>
     <TextField id="txtAddTask"  fullWidth label="What's needed to be done ?" />
     </div> 
     
     <Typography component="div" style={{ backgroundColor: 'white', height: '57vh',paddingTop:'0px' }} >
     <TodoList Items={todoTasks} onStatusChange={UpdateStatus} onDelete={DeleteToDo}/>
     </Typography>
     <Card className={classes.root}>
      <div style={{color:'#f77062',width:'40%', padding:'10px', fontWeight:'bold',  paddingLeft:'20px'}}>{taskLeft}</div>
      <div style={{float:'right',width:'60%',textAlign:'right',paddingRight:'30px'}}>
        <a className={classes.anchorSelected} id="allAnchor" onClick={()=>viewTasks("ALL")} href="#" >
        ALL
        </a>
        <a className={classes.anchorMenu} id="onGoingAnchor" onClick={()=>viewTasks("ONGOING")} href="#">
        ONGOING
        </a>
        <a className={classes.anchorMenu} id="completedAnchor" onClick={()=>viewTasks("COMPLETED")} href="#">
        COMPLETED
        </a>
     </div>
     </Card>
      </Container>

      <Dialog scroll={scroll} open={open} onClose={handleClose} aria-labelledby="Add new task">
        <DialogTitle id="max-width-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <table >{buttonItems}
              </table>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
        <Button className={classes.margin} onClick={handleClose}>
        Close
        </Button>
     </DialogActions>
      </Dialog>
    
    </React.Fragment>
    
  );
}