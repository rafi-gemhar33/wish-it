const express = require('express');
const router = express.Router();

const usersRouter = require('./api/users');
const addressesRouter = require('./api/addresses');
const eventsRouter = require('./api/events');

router.use('/users', usersRouter);
router.use('/addresses', addressesRouter);
router.use('/events', eventsRouter);

module.exports = router;