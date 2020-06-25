import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import todo from '../../Models/todo';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 250,
    },
    radioClass:{
        height:'5px'
    }
  }));

export default function ToDoList(props) {
    const classes = useStyles();
  

    const IsCompleteItems=((todoItem)=>{
        if(todoItem.completed==false)
        {
            return(<input type="radio" name="isCompleted" value={todoItem.name} onClick={()=>props.onStatusChange(todoItem.id)}></input>)
        }
        else
        return (<div>&nbsp;&nbsp;&nbsp;&nbsp;</div>);

    })

    const listItems=props.Items.map((Item)=>
    
    <ListItem>
       {IsCompleteItems(Item)}
       &nbsp;&nbsp;
       <div style={{width:"14px",height:'14px',backgroundColor:Item.Color}}> </div>&nbsp;&nbsp; <span style={{fontSize:'14px',fontFamily:'Arial'}}> {Item.name}</span> &nbsp;&nbsp; <a onClick={()=>props.onDelete(Item.id)} style={{textDecoration:'none',color:'grey'}} href="javascript:void(0)"><DeleteIcon style={{fontSize:'18px'}} /></a>
    </ListItem>
      
    );

return (
    <List className={classes.root}> 
        {listItems}
    </List>
)   

}
