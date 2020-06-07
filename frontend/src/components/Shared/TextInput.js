import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const NickInput = withStyles({
  root: {
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white'
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: 'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(218, 165, 32)',
    },
    '& .MuiFormLabel-root': {
      color: 'gray',
      fontSize: 16,
    },
    '& .MuiInputLabel-formControl': {
      left: '46px'
    },
    '& label.Mui-focused': {
      color: 'rgb(218, 165, 32)',
      left: '53px'
    },
    '& .MuiInput-underline:hover': {
      borderBottomColor: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },    
  }
})(TextField);


export default NickInput;
