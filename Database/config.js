const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const { DB_STRING } = process.env;
console.log(DB_STRING);
const db = mongoose.connection;
function dbRet() {
	return mongoose.connect(DB_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}
db.on('error', (err) => console.log(err.message + 'could not connect, error'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

module.exports = dbRet;
