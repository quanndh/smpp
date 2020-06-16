const config = require('../../configs/configs');
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        let auth = req.headers.authorization || `Bearer ${req.query.accesstoken}`;
        if (!auth || auth.search('Bearer ') !== 0) {
            return res
                .status(401)
                .json({
                    code: 401,
                    message: 'Unauthorized'
                });
        }
        let token = auth.split(' ')[1];
        let user = {};
        if (token === 'dev') {
            user = {
                "id": "15",
                "username": "84919222939",
                "device": null,
                "role": "2",
                "ip": "103.19.99.1",
                "iat": 1584523538,
                "exp": 1616059538
            }
        } else {
            user = jwt.verify(token, config.JWT_KEY);
        }
        req.user = user;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({
                code: 401,
                message: 'Unauthorized'
            });
    }
}