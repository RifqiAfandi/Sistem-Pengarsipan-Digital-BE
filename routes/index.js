const express = require('express');
const router = express.Router();

const authRoute = require('./authRoute');
const arsipRoute = require('./arsipRoute');

router.use('/api', authRoute);
router.use('/api', arsipRoute);

module.exports = router;
