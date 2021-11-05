let router = require('express').Router();
var userController = require('../controllers/user.controller');
var csvController = require('../controllers/csv.controller');

const multer = require('multer');
const upload = multer({ dest: process.env.TEMP_STORAGE });

router.route('/user')
    .get(userController.list)
    .post(userController.insert)

router.route('/mail')
    .post(upload.single('file'), csvController.send)

module.exports = router;