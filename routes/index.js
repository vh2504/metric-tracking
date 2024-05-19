const express = require('express');
const router = express.Router()
const metricsRouter = require('./metric')

router.use('/metrics', metricsRouter);

module.exports = router
