//-----------------------////////
// Modules
//-----------------------////////
const express = require('express');
const { reset } = require('nodemon');
const Item = require('../../Database/Models/inventory/item');

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
// All Item Get Route
//-----------------------////////
router.get('/', async (req, res, next) => {
	try {
		console.log('get triggered');
		res.json(await Item.find({}));
	} catch (err) {
		console.log(
			'///// error is located at inventory.js //////\nSpecifically the get route\n/////The error is: ' +
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
		res.json(await Item.create(req.body));
	} catch (err) {
		console.log(
			'///// error is located at inventory.js //////\nSpecifically the post route\n/////The error is: ' +
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
			console.log('getting item');
			let dbReturn = await Item.find({ _id: req.params.id });
			console.log('item found');
			dbReturn = dbReturn[0];
			console.log('saving item\n' + dbReturn);
			dbReturn.name = req.body.name;
			console.log(req.body.name + '<<<<<<<<<');
			dbReturn.price = req.body.price;
			console.log(req.body.price + '<<<<<<<<<<<');
			console.log('updated item\n' + dbReturn);
			const dbSave = await dbReturn.save();
			res.json(dbSave);
			console.log('it worked');
		} catch (err) {
			console.log(err.message);
		}
	} catch (err) {
		console.log(
			'///// error is located at inventory.js //////\nSpecifically the put route\n/////The error is: ' +
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
		res.json(await Item.findByIdAndDelete(req.params.id));
	} catch (err) {
		console.log(
			'///// error is located at inventory.js /////\nSpecifically the delete route\n/////The error is: ' +
				err.message +
				' /////'
		);
	}
});
//-----------------------////////
// Single item Get Route
//-----------------------////////
router.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		res.json(await Item.findById(id));
	} catch (err) {
		console.log(
			'///// error is located at inventory.js //////\nSpecifically the 2nd get route\n/////The error is: ' +
				err.message +
				' /////'
		);
	}
});

module.exports = router;
