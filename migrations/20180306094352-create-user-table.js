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
  return db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    name: { type: 'string', notNull: true, length: 255 },
    email: { type: 'string', notNull: true, length: 255 },
    password: { type: 'string', notNull: true, length: 255 },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      defaultValue: (new Date()).toISOString(),
    },
    updatedAt: 'timestamp',
  });
};

exports.down = (db) => {
  return db.dropTable('users');
};

exports._meta = {
  version: 1,
};
