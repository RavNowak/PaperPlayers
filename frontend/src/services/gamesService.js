const axios = require('axios');

export const gamesService = {
    getCreatedGames: () => {
      // return axios.get('https://paperplayers.herokuapp.com/createdGames');
      return axios.get('http://localhost:8080/createdGames');
    },

    adddNewGame: (nick, rules) => {
      // return axios.post('https://paperplayers.herokuapp.com/newGame', {
        return axios.post('http://localhost:8080/newGame', {
        nick,
        rules
      });
    },

    getInitializerRules: (initializer) => {
        // return axios.get('https://paperplayers.herokuapp.com/initializerRules', {
          return axios.get('http://localhost:8080/initializerRules', {
        params: {
          nick: initializer
        }
      });
    }
}
    