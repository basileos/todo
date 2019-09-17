const express = require('express');
const app = express();
const port = 3000;
const initDB = require('./db');
const bodyParser = require('body-parser');
const config = require("./config");

const initRoutes = () => {
    app.use(bodyParser.json());
    app.use('/api', require('./routes/auth.js'), require('./routes/tasks'));
    app.get('*.*', express.static(config.CLIENT_APP_PATH));

    app.all('*', (req, res) => {
        res.status(200).sendFile(`/`, {root: config.CLIENT_APP_PATH});
    });
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

(async() => {
    app.db = await initDB();
    initRoutes();
})();

module.exports = app;

