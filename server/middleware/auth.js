const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            req.user = null;
        } else {
            req.user = decoded;
        }
    });
    next();
};