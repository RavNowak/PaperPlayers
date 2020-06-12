import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const OrangeButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: 'rgb(218, 165, 32)',
    width: '100%',
    padding: 4,
    borderRadius: 8,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: 'rgba(218, 165, 32, 0.809)',
    },
  },
}))(Button);

const JoinButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: 'rgba(236, 164, 29, 0.802)',
    width: '50%',
    padding: 1,
    borderRadius: 8,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: 'rgba(218, 165, 32, 0.809)',
    },
  },
}))(Button);

const SendButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: 'rgb(218, 165, 32)',
    width: '15%',
    padding: 2,
    borderRadius: 0,
    borderBottomRightRadius: 13,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: 'rgba(218, 165, 32, 0.809)',
    },
  },
}))(Button);

const AcceptMovesButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: 'transparent',
    // border: '2px solid rgb(218, 165, 32)',
    width: '100%',
    height: '100%',
    padding: 5,
    borderRadius: '50%',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: 'rgba(218, 165, 32, 0.809)',
    },
    '&:disabled': {
      color: 'rgba(128, 128, 128, 0.483)'
    },
  },
}))(Button);


export { OrangeButton, JoinButton, SendButton, AcceptMovesButton}