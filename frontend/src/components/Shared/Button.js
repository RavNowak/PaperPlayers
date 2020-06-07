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
    backgroundColor: 'rgba(255, 0, 0, 0.687)',
    width: '50%',
    padding: 2,
    borderRadius: 8,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: 'rgba(255, 0, 0, 0.887)',
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
    backgroundColor: 'rgb(218, 165, 32)',
    width: '60%',
    padding: 5,
    marginTop: 15,
    borderRadius: 5,
    fontWeight: 600,
    WebkitBoxShadow: '0px 0px 55px 0px rgba(250,240,127,1)',
    MozBoxShadow: '0px 0px 55px 0px rgba(250,240,127,1)',
    boxShadow: '0px 0px 55px 0px rgba(250,240,127,1)',
    '&:hover': {
      backgroundColor: 'rgba(218, 165, 32, 0.809)',
    },
  },
}))(Button);


export { OrangeButton, JoinButton, SendButton, AcceptMovesButton}