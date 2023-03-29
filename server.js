//-----------------------////////
// Modules
//-----------------------////////
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
require('./Database/config')();
require('dotenv').config();
const app = express();
//-----------------------////////
// Environment Variables
//-----------------------////////
const { PORT, DB_STRING } = process.env;

//-----------------------////////
// Routes
//-----------------------////////
const inventoryPage = require('./App/routers/inventory');

//-----------------------////////
// Middleware
//-----------------------////////

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//-----------------------////////
// Route Handlers
//-----------------------////////
app.use('/', inventoryPage);

app.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
