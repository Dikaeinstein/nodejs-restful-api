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
  const columnSpecs = {
    type: 'timestamp',
    notNull: true,
    defaultValue: (new Date()).toISOString(),
  };

  return db.changeColumn('todos', 'created_at', columnSpecs)
    .then(() => db.changeColumn('todos', 'user_id', {
      notNull: true,
    }))
    .then(() => {
      return db.changeColumn('todo_items', 'created_at', columnSpecs);
    })
    .then(() => {
      return db.changeColumn('todo_items', 'todo_id', {
        notNull: true,
      });
    })
    .then(() => {
      return db.changeColumn('users', 'created_at', columnSpecs);
    })
    .catch(() => undefined);
};

exports.down = (db) => {
  return null;
};

exports._meta = {
  version: 1,
};
