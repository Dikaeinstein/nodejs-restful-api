let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = (options, seedLink) => {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = (db) => {
  return db.renameColumn('todos', 'updatedAt', 'updated_at')
    .then(() => {
      return db.renameColumn('todos', 'createdAt', 'created_at');
    })
    .then(() => {
      return db.renameColumn('todo_items', 'updatedAt', 'updated_at');
    })
    .then(() => {
      return db.renameColumn('todo_items', 'createdAt', 'created_at');
    })
    .then(() => {
      return db.renameColumn('users', 'createdAt', 'created_at');
    })
    .then(() => {
      return db.renameColumn('users', 'updatedAt', 'updated_at');
    })
    .catch(() => undefined);
};

exports.down = (db) => {
  return db.renameColumn('todos', 'updated_at', 'updatedAt')
    .then(() => {
      return db.renameColumn('todos', 'created_at', 'createdAt');
    })
    .then(() => {
      return db.renameColumn('todo_items', 'updated_at', 'updatedAt');
    })
    .then(() => {
      return db.renameColumn('todo_items', 'created_at', 'createdAt');
    })
    .then(() => {
      return db.renameColumn('users', 'updated_at', 'updatedAt');
    })
    .then(() => {
      return db.renameColumn('users', 'created_at', 'createdAt');
    })
    .catch(() => undefined);
};

exports._meta = {
  version: 1,
};
