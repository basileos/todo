const {db} = require('./../index');
const {ObjectId} = require('mongodb');

module.exports = async (req, res, next) => {
    const user = await db.collection('users').findOne({_id: ObjectId(req.userId)});
    if (user) {
        req.user = user;
        next();
    }
};
