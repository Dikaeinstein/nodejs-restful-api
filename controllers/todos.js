const db = require('../db');
const {
  createError,
  buildTodos,
  buildTodo,
  cache,
} = require('../lib');


// todo controller
const todoController = {
  // insert todo
  create(req, res, next) {
    const { title, userId } = req.body;
    if (!title || !userId) {
      const error = createError({
        message: 'Bad Request',
        statusCode: 400,
      });

      return next(error);
    }

    return db.none('INSERT INTO todos(title, user_id) VALUES($1, $2)', [title, userId])
      .then(() => res.status(200).json({
        status: 'success',
        message: 'todo successfully created',
      }))
      .catch((err) => {
        const error = createError({
          message: 'Error creating todo',
          statusCode: 500,
          err,
        });

        return next(error);
      });
  },
  // select / fetch all todos
  list(req, res, next) {
    return db.task(buildTodos)
      .then((data) => {
        const respObj = {
          status: 'success',
          message: 'Retrieved all todos',
          data,
        };
        cache.cacheData(req, respObj);

        return res.status(200).json(respObj);
      })
      .catch((err) => {
        const error = createError({
          message: 'Error Retrieving todos',
          statusCode: 500,
          err,
        });

        return next(error);
      });
  },
  // fetch single todo
  retrieve(req, res, next) {
    const { todoId } = req.params;

    if (!todoId) {
      const error = createError({
        message: 'Bad request',
        statusCode: 400,
      });

      return next(error);
    }

    return db.task(buildTodo(todoId))
      .then((data) => {
        const respObj = {
          status: 'success',
          message: 'Retrieved todo',
          data,
        };
        cache.cacheData(respObj);

        return res.status(200).json(respObj);
      })
      .catch((err) => {
        const error = createError({
          message: 'Error Retrieving todo',
          statusCode: 500,
          err,
        });

        return next(error);
      });
  },
  // update todo
  update(req, res, next) {
    const { title, userId } = req.body;
    const { todoId } = req.params;

    if (!title || !todoId || !userId) {
      const error = createError({
        message: 'Bad request',
        statusCode: 400,
      });

      return next(error);
    }

    return db.none('UPDATE todos SET title = $1, user_id = $2 WHERE todos.id = $3', [title, userId, todoId])
      .then(() => res.status(200).json({
        status: 'success',
        message: 'Successfully updated todo',
      }))
      .catch((err) => {
        const error = createError({
          message: 'Error Updating todo',
          statusCode: 500,
          err,
        });

        return next(error);
      });
  },
  // delete todo
  delete(req, res, next) {
    const { todoId } = req.params;

    if (!todoId) {
      const error = createError({
        message: 'Bad request',
        statusCode: 400,
      });

      return next(error);
    }

    return db.none('DELETE FROM todos WHERE id = $1', [todoId])
      .then(() => res.status(200).json({
        status: 'success',
        message: 'Successfully deleted todo',
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

module.exports = todoController;
