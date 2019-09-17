const initDB = require('./../db');
const {hash} = require('./../helpers');

const args = process.argv.slice(2);
const [login, password] = args;
if(!login || !password) {
    console.error(`login and password are required`);
    process.exit(1);
}
(async() => {
    const db = await initDB();
    const user = await db.collection('users').findOne({login});
    if(user) {
        console.error(`User with login: ${login} already exists`);
        process.exit(1);
    }
    await db.collection('users').insertOne({login, hash: hash(password)});
    console.log(`User with login: ${login} was successfully created`);
    process.exit(0);
})();
