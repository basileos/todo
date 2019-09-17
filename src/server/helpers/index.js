const config = require('./../config');

module.exports  = {
    hash: (value) => {
        let hash = 0, chr;
        if (value.length === 0) return hash;
        for (let i = 0; i < value.length; i++) {
            chr   = value.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    },
    createToken: () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    getTokenFromRequest: (req) => {
        let token;
        const {headers: {cookie}} = req;
        const tokenHeader = cookie.split(";").map(i => i.trim()).find(i => i.startsWith(config.COOKIE_HEADER_NAME));
        if(tokenHeader) {
            token = tokenHeader.split("=")[1];
        }
        return token;

    }
};
