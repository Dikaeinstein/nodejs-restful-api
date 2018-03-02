const express = require('express');
const { cache, authenticateToken } = require('../lib');
const {
  todoController,
  todoItemController,
  userController,
} = require('../controllers');

const router = express.Router();

// User end points
// Create user
router.post('/users', userController.create);
// User login
router.post('/users/login', userController.retrieve);
// List users
router.get('/users', authenticateToken, userController.list);

// Authenticated Todo end points
router.get('/todos', authenticateToken, cache.retrieveCache, todoController.list);
router.post('/todos', authenticateToken, todoController.create);
router.get('/todos/:todoId', authenticateToken, cache.retrieveCache, todoController.retrieve);
router.put('/todos/:todoId', authenticateToken, todoController.update);
router.delete('/todos/:todoId', authenticateToken, todoController.delete);

// Authenticated Todo item end points
router.post('/todos/:todoId/items', authenticateToken, todoItemController.create);
router.get('/todos/:todoId/items', authenticateToken, cache.retrieveCache, todoItemController.list);
router.get('/todos/:todoId/items/:itemId', authenticateToken, cache.retrieveCache, todoItemController.retrieve);
router.put('/todos/:todoId/items/:itemId', authenticateToken, todoItemController.update);
router.delete('/todos/:todoId/items/:itemId', authenticateToken, todoItemController.delete);

module.exports = router;
