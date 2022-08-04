const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_CONFIG_HOST,
    port: process.env.REDIS_CONFIG_PORT,
    password: process.env.REDIS_CONFIG_PASSWORD
});


module.exports = redis