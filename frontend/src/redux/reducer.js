import { SET_NICK, SET_RULES, SET_OPONENT, SET_INITIALIZER } from './types';

const initialState = {
  nick: '',
  rules: {},
  oponent: '',
  initializer: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NICK:
      return {
        ...state,
        nick: action.nick
      }
      case SET_RULES:
        return {
          ...state,
          rules: action.rules
        }
      case SET_OPONENT:
        return {
          ...state,
          oponent: action.oponent
        }
        case SET_INITIALIZER: 
          return {
            ...state,
            initializer: action.initializer
          }
        
      default: 
        return state;
  }
}

export default reducer;