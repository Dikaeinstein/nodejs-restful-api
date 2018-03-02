const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const {
  createError,
  buildUsers,
  cache,
} = require('../lib');


// Basic user controller
const userController = {
  // Create user and generate jwt for authentication
  create(req, res, next) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = createError({
        message: 'Bad Request',
        statusCode: 400,
      });

      return next(error);
    }

    return bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      return db.one(
        'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id',
        [name, email, hashedPassword],
      )
        .then((user) => {
          const token = jwt.sign(
            { id: user.id },
            process.env.SECRET,
            { expiresIn: 86400 },
          );

          res.status(200)
            .set('x-access-token', token)
            .json({
              status: 'success',
              message: 'user successfully created',
            });
        })
        .catch((err) => {
          const error = createError({
            message: 'Error creating user',
            statusCode: 500,
            err,
          });

          return next(error);
        });
    });
  },
  // select / fetch all users
  list(req, res, next) {
    return db.task(buildUsers)
      .then((data) => {
        const resObj = {
          status: 'success',
          message: 'Retrieved all users',
          data,
        };
        cache.cacheData(req, resObj);

        return res.status(200).json(resObj);
      })
      .catch((err) => {
        const error = createError({
          message: 'Error Retrieving users',
          statusCode: 500,
          err,
        });

        return next(error);
      });
  },
  // Authenticate and generate jwt for authentication for subsequent logins
  retrieve(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = createError({
        message: 'Bad request',
        statusCode: 400,
      });

      return next(error);
    }

    return db.one('SELECT id, password FROM users WHERE users.email = $1', [email])
      .then((user) => {
        return bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            const error = createError({
              message: 'Wrong password',
              statusCode: 401,
              err,
            });

            return next(error);
          }

          const token = jwt.sign(
            { id: user.id },
            process.env.SECRET,
            { expiresIn: 86400 },
          );

          return res.status(200)
            .set('x-access-token', token)
            .json({
              status: 'success',
              message: 'successfully logged in',
            });
        });
      })
      .catch((err) => {
        const error = createError({
          message: 'User Not Fount',
          statusCode: 404,
          err,
        });

        return next(error);
      });
  },
};

module.exports = userController;
