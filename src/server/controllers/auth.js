const {db} = require('./../index');
const {hash, createToken} = require('./../helpers');
const config = require('./../config');

module.exports = {
    login: async (req, res) => {
        const {login, password} = req.body;
        if(!login || !password) {
            res.status(400).json({message: 'Invalid request'});
            return;
        }
        const user = await db.collection('users').findOne({login});
        if(!user || hash(password) !== user.hash) {
            res.status(401).json({message: 'Invalid credentials'});
            return;
        }
        const token = createToken();
        await db.collection('sessions').insertOne({userId: user._id, token} );
        res.cookie(config.COOKIE_HEADER_NAME, token, { path: '/', httpOnly: false });
        res.send({loginName: user.login, isAuthorized: true});
    },
    logout: async (req, res) => {
        await db.collection('sessions').findOneAndDelete({_id: req.sessionId} );
        res.clearCookie(config.COOKIE_HEADER_NAME, { path: '/', httpOnly: false });
        res.send({loginName: req.user.login, isAuthorized: false});
    }
};
