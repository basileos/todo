const util = require('util');
const mongoClient = require('mongodb').MongoClient;
const config = require("./config");
const connectMongo = util.promisify(mongoClient.connect);

module.exports = async () => {
    const dbConnection = await connectMongo(`mongodb://${config.DB_HOST}:${config.DB_POR}/${config.DB_NAME}`,
        { useNewUrlParser: true, useUnifiedTopology: true });
    const db = dbConnection.db('doit');
    process.on('exit', () => {
        if(dbConnection) {
            dbConnection.close();
        }
    });
    return db;
};
