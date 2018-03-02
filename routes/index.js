const express = require('express');
const { cache, authenticateToken } = require('../lib');
const {
  todoController,
  todoItemController,
  userController,
} = require('../controllers');

const router = express.Router();

// Api root
router.get('/', (req, res) => {
  const message = `Welcome to Todo API. All endpoints are authenticated except to create user and to login
 and the api root page. So to query the API endpoints you must be register to get jwt to authorize you to 
 query those endpoints. Phew! That was alot. Thanks for staying up to this point.`;

  return res.status(200).json({
    status: 'success',
    message,
  });
});

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
