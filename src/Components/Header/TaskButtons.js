import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Category from '../../Models/Category';


const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

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
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
    
  },
});

export default function TaskButtons() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('body');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const addCategory=()=>{

    
    var metadata={
      Name:document.getElementById("txtCategory").value,
      Color:document.getElementById("txtColor").value
    }

    Category.push(metadata);
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const buttonItems=Category.map((Item)=>
    
  <ColorButton variant="contained" color="primary" className={classes.margin}>
    {Item.Name}
  </ColorButton>
     
  );

  return (
    <div>
      {buttonItems}
      <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={handleClickOpen}>
        +
      </BootstrapButton>
      <Dialog
        scroll={scroll}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      
      >
        <DialogTitle id="max-width-dialog-title">Add New Category</DialogTitle>
        <DialogContent>
         
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
            <TextField id="txtCategory" label="Category" />
   
           <TextField id="txtColor" label="Color Code" />
              
            </FormControl>
          
          </form>
        </DialogContent>
        <DialogActions>
        <ColorButton variant="contained" color="secondary" className={classes.margin} onClick={addCategory}>
        Add Category
        </ColorButton>
        <ColorButton variant="contained" color="secondary" className={classes.margin} onClick={handleClose}>
        Close
        </ColorButton>
     
        </DialogActions>
      </Dialog>
    </div>
  

  );
}
