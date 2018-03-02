const db = require('../db');
const { createError, cache } = require('../lib/createError');

// todo item controller
const todoItemsController = {
  // insert todo
  create(req, res, next) {
    const { todoId } = req.params;
    const { content, complete } = req.body;

    if (!todoId || !content || complete === undefined) {
      const error = createError({
        message: 'Bad Request',
        statusCode: 400,
      });

      return next(error);
    }

    return db.none(
      'INSERT INTO todo_items(content, complete, todoId) VALUES($1, $2, $3)',
      [content, complete, todoId],
    )
      .then(() => res.status(200).json({
        status: 'success',
        message: 'Successfully saved todo item',
      }))
      .catch((err) => {
        const error = createError({
          message: 'Error creating todo item',
          statusCode: 500,
          err,
        });

        return next(error);
      });
  },
  // select / fetch all todo items
  list(req, res, next) {
    const { todoId } = req.params;
    if (!todoId) {
      const error = createError({
        message: 'Bad Request',
        statusCode: 400,
      });

      return next(error);
    }

    return db.any(
      'SELECT id, content, complete, updated_at, created_at FROM todo_items WHERE todoId = $1',
      [todoId],
    )
      .then((data) => {
        const respObj = {
          status: 'success',
          message: 'Retrieved todo items',
          data,
        };
        cache.cacheData(req, respObj);

        return res.status(200).json(respObj);
      })
      .catch((err) => {
        const error = createError({
          message: 'Error retrieving todo items',
          statusCode: 500,
          err,
        });
        return next(error);
      });
  },
  // fetch single todo item
  retrieve(req, res, next) {
    const { todoId, itemId } = req.params;

    if (!todoId) {
      const error = createError({
        message: 'Bad Request',
        statusCode: 400,
      });

      return next(error);
    }

    return db.any(
      'SELECT id, content, complete, updated_at, created_at FROM todo_items WHERE todoId = $1 AND id = $2',
      [todoId, itemId],
    )
      .then((data) => { 
        const respObj = {
          status: 'success',
          message: 'Retrieved todo item',
          data,
        };
        cache.cacheData(req, respObj);
        return res.status(200).json(respObj);
      })
      .catch((err) => {
        const error = createError({
          message: 'Error retrieving todo item',
          statusCode: 500,
          err,
        });

        return next(error);
      });
  },
  // update todo item
  update(req, res, next) {
    const { todoId, itemId } = req.params;
    const { content, complete } = req.body;
    const updatedAt = new Date();

    if (!todoId || !itemId || !content || complete === undefined) {
      const error = createError({
        message: 'Bad Request',
        statusCode: 400,
      });

      return next(error);
    }

    return db.none(
      'UPDATE todo_items SET content = $1, complete = $2, updated_at = $3 WHERE todo_items.id = $4 AND todo_items.todoId = $5',
      [content, complete, updatedAt.toISOString(), itemId, todoId],
    )
      .then(() => res.status(200).json({
        status: 'success',
        message: 'Successfully updated todo item',
      }))
      .catch((err) => {
        const error = createError({
          message: 'Error Updating todo item',
          statusCode: 500,
          err,
        });

        return next(error);
      });
  },
  // delete todo item
  delete(req, res, next) {
    const { todoId, itemId } = req.params;

    if (!todoId || !itemId) {
      const error = createError({
        message: 'Bad request',
        statusCode: 400,
      });

      return next(error);
    }

    return db.none(
      'DELETE FROM todo_items WHERE todo_items.id = $1 AND todo_items.todoId = $2',
      [itemId, todoId],
    )
      .then(() => res.status(200).json({
        status: 'success',
        message: 'Successfully deleted todo item',
      }))
      .catch((err) => {
        const error = createError({
          message: 'Error deleting todo',
          statusCode: 500,
          err,
        });

        return next(error);
      });
  },
};

module.exports = todoItemsController;
