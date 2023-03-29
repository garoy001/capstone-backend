//-----------------------////////
// Modules
//-----------------------////////
const express = require('express');
const { reset } = require('nodemon');
const User = require('../../Database/Models/users/user');

//-----------------------////////
// Routers
//-----------------------////////
const router = express.Router();

//-----------------------////////
// Middleware
//-----------------------////////
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//-----------------------////////
// User Get Route
//-----------------------////////
router.get('/', async (req, res, next) => {
	try {
		console.log('get triggered');
		res.json(await User.find({}));
	} catch (err) {
		console.log(
			'///// error is located at usercart.js //////\nSpecifically the get route\n/////The error is: ' +
				err.message +
				' /////'
		);
	}
});
//-----------------------////////
// Post Route
//-----------------------////////

router.post('/', async (req, res, next) => {
	try {
		console.log('post triggered');
		res.json(await User.create(req.body));
	} catch (err) {
		console.log(
			'///// error is located at usercart.js //////\nSpecifically the post route\n/////The error is: ' +
				err.message +
				' /////'
		);
	}
});
//-----------------------////////
// Put Route
//-----------------------////////
router.put('/:id', async (req, res, next) => {
	try {
		console.log('got to the put');
		console.log('id =  ' + req.params.id);
		console.log(req.body);
		try {
			console.log('getting user');
			let dbReturn = await User.find({ _id: req.params.id });
			console.log('user found');
			dbReturn = dbReturn[0];
			console.log('saving user\n' + dbReturn);

			if (req.body.operation == 'add') {
				dbReturn.cart = [...dbReturn.cart, req.body.updatedCart];
			} else if (req.body.operation == 'remove') {
				cartOp = dbReturn.cart;
				returnCart = cartOp.filter((obj) => {
					obj.name !== req.body.updatedCart.name;
				});
				dbReturn.cart = returnCart;
			}

			console.log('updated user\n' + dbReturn);
			const dbSave = await dbReturn.save();
			res.json(dbSave);
			console.log('it worked');
		} catch (err) {
			console.log(err.message);
		}
	} catch (err) {
		console.log(
			'///// error is located at usercart.js //////\nSpecifically the put route\n/////The error is: ' +
				err.message +
				' /////'
		);
	}
});
//-----------------------////////
// Delete Route
//-----------------------////////
router.delete('/:id', async (req, res, next) => {
	try {
		res.json(await User.findByIdAndDelete(req.params.id));
	} catch (err) {
		console.log(
			'///// error is located at usercart.js /////\nSpecifically the delete route\n/////The error is: ' +
				err.message +
				' /////'
		);
	}
});

module.exports = router;
