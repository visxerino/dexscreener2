const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');

// Use the getMultipleTokensData function as the callback for the /tokens route
router.get('/tokens', coinController.getMultipleTokensData);

module.exports = router;