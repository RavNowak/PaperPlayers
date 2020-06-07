const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const { registerController } = require('../controllers/registerController');
const { createdGamesController } = require('../controllers/createdGamesController');
const { newGameController } = require('../controllers/newGameController');
const { initializerRulesController } = require('../controllers/initializerRulesControler');


const router = express.Router();

router.use(cors({
  origin: [
    'http://localhost:3000',
    // 'https://ravnowak.github.io'
],
  credentials: true
}));

router.use(bodyParser.json());

// router.use(logController);

router.post('/register', registerController);

router.post('/newGame', newGameController);

router.get('/createdGames', createdGamesController);

router.get('/initializerRules', initializerRulesController);

module.exports = router;