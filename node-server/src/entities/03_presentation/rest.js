/**
 * Created by aarutunyan on 3/18/15.
 */
var express = require('express');
var router = express.Router();

//var auth = require('./auth.js');
var handlers = require('../02_business/handlers');
//var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
//router.post('/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/handlers', handlers.getAll); // just for example

module.exports = router;