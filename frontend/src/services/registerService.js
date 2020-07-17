const axios = require('axios');

export const registerService = {
    register: (nick) => {
        // return axios.post('https://paperplayers.herokuapp.com/register', {
          return axios.post('http://localhost:8080/register', {
        nick
      });
    }
}
    