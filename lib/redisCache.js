const redis = require('redis');

const { REDIS_URL } = process.env;

const client = redis.createClient(REDIS_URL);

const cache = {
  // retrieve from redis cache middleware
  retrieveCache(req, res, next) {
    return client.get(req.originalUrl, (err, data) => {
      if (err) {
        throw err;
      }
      return data !== null ? res.status(200).json({ data }) : next();
    });
  },
  // cache to redis
  cacheData(req, data) {
    client.setex(req.originalUrl, 60, JSON.stringify(data, 5), redis.print);
  },
};

module.exports = cache;
