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
      
    }
    else if(status=="ONGOING")
    {
      todo.map((Item)=>{
        if(Item.completed==false)
        viewTodoTasks.push(Item)
      })
     
    }
    else if(status=="COMPLETED")
    {
      todo.map((Item)=>{
        if(Item.completed==true)
        viewTodoTasks.push(Item)
      })
      
    }
    
    setTasks(viewTodoTasks)
  };



  let taskLeftCount=0;
  todo.map((Item)=>{
    if(Item.completed==false)
    taskLeftCount++;
  })
  taskLeft=taskLeftCount+" tasks left"

  

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const addTask = (category) => {

    var metadata={
      id: 2,
      name:document.getElementById('txtAddTask').value,
      completed: false,
      category: category
    }

    todo.push(metadata);
    document.getElementById('txtAddTask').value="";
    setOpen(false);

  };

  const buttonItems=Category.map((Item)=>
  <div>
  <ColorButton variant="contained" color="primary" className={classes.margin} onClick={()=>addTask(Item.Name)}>
    {Item.Name}
  </ColorButton>
  </div>
     
  );
  return (

    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      <Typography component="div" style={{ backgroundColor: 'white', height: '35vh',paddingTop:'10px' }} >
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
     <TodoList Items={todoTasks}/>
     </Typography>
     <Card className={classes.root}>
      <div style={{color:'#f77062',width:'40%', padding:'10px', fontWeight:'bold',  paddingLeft:'20px'}}>{taskLeft}</div>
      <div style={{float:'right',width:'60%',textAlign:'right',paddingRight:'30px'}}>
        <a className={classes.anchorSelected} onClick={()=>viewTasks("ALL")} href="#" >
        ALL
        </a>
        <a className={classes.anchorMenu} onClick={()=>viewTasks("ONGOING")} href="#">
        ONGOING
        </a>
        <a className={classes.anchorMenu} onClick={()=>viewTasks("COMPLETED")} href="#">
        COMPLETED
        </a>
     </div>
     </Card>
      </Container>

      <Dialog scroll={scroll} open={open} onClose={handleClose} aria-labelledby="Add new task">
        <DialogTitle id="max-width-dialog-title">Add New Task</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              {buttonItems}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
        <ColorButton variant="contained" color="secondary" className={classes.margin} onClick={handleClose}>
        Close
        </ColorButton>
     </DialogActions>
      </Dialog>
    
    </React.Fragment>
    
  );
}