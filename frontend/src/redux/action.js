import { SET_NICK, SET_RULES, SET_OPONENT, SET_INITIALIZER } from './types';

export const setNick = (nick) => {
    return {
        type: SET_NICK,
        nick
    }
}

export const setRules = (rules) => {
  return {
    type: SET_RULES,
    rules
  }
}

export const setOponent = (oponent) => {
  return {
    type: SET_OPONENT,
    oponent
  }
}

export const setInitializer = (value) => {
  return {
    type: SET_INITIALIZER,
    initializer: value
  }
}
