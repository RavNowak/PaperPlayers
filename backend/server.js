const {initializeWebSocketConnection} = require('./routes/actions')

const express = require('express');
const router = require('./routes/routes');

const port = process.env.PORT || 8080;

const app = express();

app.use('/', router);

const server = app.listen(port, () => console.log(`Server is listening on port ${port}`));

initializeWebSocketConnection(server);


