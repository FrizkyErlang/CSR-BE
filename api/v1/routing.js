const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json())

// api router

const todoController = require('./todo_modules/index');
router.use('/todo', todoController);

module.exports = router;