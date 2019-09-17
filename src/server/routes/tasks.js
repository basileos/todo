const express = require('express');
const router = express.Router();
const tasksController = require('./../controllers/tasks');
const checkAuthorization = require('./../middleware/auth');

router.post('/tasks', checkAuthorization, tasksController.post);
router.put('/tasks/:id', checkAuthorization, tasksController.put);
router.get('/tasks', checkAuthorization, tasksController.getAll);
router.get('/tasks/:id', checkAuthorization, tasksController.get);
router.delete('/tasks/:id', checkAuthorization, tasksController.delete);

module.exports = router;
