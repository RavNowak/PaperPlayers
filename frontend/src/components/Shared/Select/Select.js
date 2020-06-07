import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './select.scss';

const NewSelect = withStyles((theme) => ({
  root: {
    color: 'white',
    width: '150px',
    padding: '5px 0',
    fontSize: 14,
    '&.MuiInput-underline:before': {
      borderBottom: '1px solid white'
    }
  },
}))(Select);

const NewLabel = withStyles((theme) => ({
  root: {
    color: 'rgb(218, 165, 32)',
    fontSize: 16,
    '&.Mui-focused': {
      color: 'rgb(218, 165, 32)',
    }
  },
}))(InputLabel);

const NewItem = withStyles((theme) => ({
  root: {
    color: 'rgb(218, 165, 32)',
    padding: 5,
    fontSize: 14,
    '&.MuiListItem-root': {
      justifyContent: 'center',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 166, 0, 0.269)'
    }
  },
}))(MenuItem);

const NewFrom = withStyles((theme) => ({
  root: {
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid white'
    },
    '& .MuiInput-underline:after': {
      borderBottom: '1px solid white'
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: '1px solid white'
    }
  }
}))(FormControl);

class OrangeSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    console.log(e.target.value);
  };

  render = () => {
    return (
      <>
        <NewFrom>
          <NewLabel id="demo-simple-select-label">{this.props.label}</NewLabel>
          <NewSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            onChange={this.props.handleChange}
          >
            {this.props.items.map(item => <NewItem value={item.value}>{item.name}</NewItem>)}
          </NewSelect>
        </NewFrom>
      </>
    );
  }
}

export default OrangeSelect;