import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


export default function AppDialogBox(props){
  
  
    return (
        <Dialog 
        scroll='body' 
        open={props.Open} 
        onClose={props.HandleClose} 
        aria-labelledby={props.Title}   >
        <DialogTitle id="max-width-dialog-title">{props.Title}</DialogTitle>
        <DialogContent>
           {props.children}
         </DialogContent>
        <DialogActions>
        {props.AddButton}
        <Button className={props.Margin} onClick={props.HandleClose}>
        Close
        </Button>
       </DialogActions>
      </Dialog>
    )

}