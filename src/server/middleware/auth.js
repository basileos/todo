const {db} = require('./../index');
const {getTokenFromRequest} = require('./../helpers');

module.exports = async (req, res, next) => {
    const token = getTokenFromRequest(req);
    const session = await db.collection('sessions').findOne({token});
    if (session) {
        req.sessionId = session._id;
        req.userId = session.userId;
        next();
        return;
    }
    res.status(403).json({message: 'Forbidden'});
};
