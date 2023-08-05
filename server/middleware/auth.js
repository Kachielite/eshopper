const jwt = require('jsonwebtoken');
const User = require("../models/Users");

exports.isAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let decodedToken = {};

    if (!token) {
        return res.status(401).json({message: "Authentication Required. Include a valid token in the 'Authorization' header using the 'Bearer' scheme."});
    }

    try {
        decodedToken = jwt.verify(token, process.env.PRIVATEKEY)
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 401;
            error.message = 'Token expired or invalid';
        }
        next(error);
    }


    User.findById(decodedToken.userId)
        .then(user => {
            if (!user) {
                const error = new Error("User with this token not found");
                error.statusCode = 404;
                throw error;
            }
            req.user = decodedToken;
            next();
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};
