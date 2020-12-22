'use-strict';
const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Authenticate User Function
exports.authenticateUser = async(req, res, next) => {
    let message;
    const credentials = auth(req);

    if (credentials) {
        const user = await User.findOne({where: {emailAddress: credentials.name}})
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            if (authenticated) {
            req.currentUser = user;
            req.currentUserId = user.id;
            } else {
                message = `Authentication failed for user ${user.emailAddress}`
            }
        } else {
            message = `User not found for email: ${credentials.name}`;    
    } 
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        console.log(message);
        res.status(401).json({message: 'Access Denied'});
    } else {
    next();
}
}