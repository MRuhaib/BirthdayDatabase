const express = require('express');
const birthdayController = require('../controllers/controllers.js')

const router = express.Router();

//to get all entries:
router.get('/all', birthdayController.viewAll)

//to get a specific entry:
router.get('/one', birthdayController.viewOne)

//to add an entry:
router.post('/add', birthdayController.addOne)

//to delete an entry:
router.delete('/delete', birthdayController.deleteOne)

//to update an entry:
router.patch('/update', birthdayController.updateOne)

//to get the closest birthday:
router.get('/closest', birthdayController.closestOne)

module.exports = router;