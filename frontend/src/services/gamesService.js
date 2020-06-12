const axios = require('axios');

export const gamesService = {
    getCreatedGames: () => {
      return axios.get('http://localhost:8080/createdGames');
    },

    adddNewGame: (nick, rules) => {
      return axios.post('http://localhost:8080/newGame', {
        nick,
        rules
      });
    },

    getInitializerRules: (initializer) => {
      return axios.get('http://localhost:8080/initializerRules', {
        params: {
          nick: initializer
        }
      });
    }
}
    