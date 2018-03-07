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

const createTodoItems = (database) => {
  return database.createTable('todo_items', {
    id: {
      type: 'int',
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    content: { type: 'string', length: 255 },
    complete: 'boolean',
    todo_id: {
      type: 'int',
      foreignKey: {
        name: 'todo_item_todo_id_fk',
        table: 'todos',
        rules: {
          onUpdate: 'RESTRICT',
          onDelete: 'CASCADE',
        },
        mapping: 'id',
      },
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      defaultValue: (new Date()).toISOString(),
    },
    updatedAt: 'timestamp',
  });
};

const createTodo = (database) => {
  return database.createTable('todos', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    title: { type: 'string', notNull: true, length: 255 },
    user_id: {
      type: 'int',
      foreignKey: {
        name: 'todo_user_id_fk',
        table: 'users',
        rules: {
          onUpdate: 'RESTRICT',
          onDelete: 'CASCADE',
        },
        mapping: 'id',
      },
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      defaultValue: (new Date()).toISOString(),
    },
    updatedAt: 'timestamp',
  });
};

exports.up = (db) => {
  return createTodo(db)
    .then(result => createTodoItems(db))
    .catch(err => undefined);
};

exports.down = (db) => {
  return db.dropTable('todos')
    .then(result => db.dropTable('todo-items'))
    .catch(err => undefined);
};

exports._meta = {
  version: 1,
};
