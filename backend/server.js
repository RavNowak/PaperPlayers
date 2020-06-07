const {initializeWebSocketConnection} = require('./routes/actions')

const express = require('express');
const http = require('http');
const router = require('./routes/routes');

const port = process.env.PORT || 8080;

const app = express();

app.use('/', router);

const server = http.createServer(app);

initializeWebSocketConnection(server);

server.listen(port, () => console.log(`Server is listening on port ${port}`));

