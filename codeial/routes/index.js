const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

console.log('router is loaded yehhh');

router.get('/', homeController.home);

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));

module.exports = router;
