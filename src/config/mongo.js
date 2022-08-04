const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_CONFIG_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbName = process.env.MONGO_CONFIG_DB_NAME;
client.connect();

const db = client.db(dbName);

module.exports = db;