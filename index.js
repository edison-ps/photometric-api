const express = require('express');
const bodyParser = require('body-parser');
const userControllers = require('./controllers/users');
const unitsControllers = require('./controllers/units');
const filtersControllers = require('./controllers/filters');
const comparationsControllers = require('./controllers/comparations');
const objectsControllers = require('./controllers/objects');
const observationsControllers = require('./controllers/observations');
const { sendErrorMessage } = require('./middwares/errors');
const { validateToken } = require('./middwares/validateToken');

require('dotenv').config();

const { ADHARA_API_PORT } = process.env;

const app = express();

app.use(bodyParser.json());

app.listen(ADHARA_API_PORT, () => console.log(`API online na porta ${ADHARA_API_PORT}`));

app.post('/login', userControllers.login);

app.post('/users', validateToken, userControllers.create);

app.get('/users', validateToken, userControllers.getAll);

app.get('/users/:id', validateToken, userControllers.getById);

app.delete('/users', validateToken, userControllers.remove);

app.post('/units', validateToken, unitsControllers.create);

app.get('/units', validateToken, unitsControllers.getAll);

app.get('/units/:id', validateToken, unitsControllers.getById);

app.delete('/units/:id', validateToken, unitsControllers.remove);

app.post('/filters', validateToken, filtersControllers.create);

app.get('/filters', validateToken, filtersControllers.getAll);

app.get('/filters/:id', validateToken, filtersControllers.getById);

app.delete('/filters/:id', validateToken, filtersControllers.remove);

app.post('/comparations', validateToken, comparationsControllers.create);

app.get('/comparations', validateToken, comparationsControllers.getAll);

app.get('/comparations/:id', validateToken, comparationsControllers.getById);

app.delete('/comparations/:id', validateToken, comparationsControllers.remove);

app.delete('/objects/:id', validateToken, objectsControllers.remove);

app.post('/objects', validateToken, objectsControllers.create);

app.get('/objects', validateToken, objectsControllers.getAll);

app.get('/objects/:id', validateToken, objectsControllers.getById);

app.delete('/objects/:id', validateToken, objectsControllers.remove);

app.post('/observations', validateToken, observationsControllers.create);

app.get('/observations', observationsControllers.getAll);

app.get('/observations/:id', observationsControllers.getById);

app.delete('/observations/:id', validateToken, observationsControllers.remove);

app.use(sendErrorMessage);
