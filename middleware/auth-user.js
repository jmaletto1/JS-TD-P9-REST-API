'use-strict';
const auth = require('basic-auth');
const { User } = require('../models');

exports.authenticateUser = async(req, res, next) => {
    let message;
    const credentials = auth(req);
    console.log(credentials);

    if (credentials) {
        const user = await User.findOne({where: {emailAddress: credentials.name, password: credentials.pass}})
        if (user) {
            req.currentUser = user;
            req.currentUserId = user.id;
            // if (password === credentials.password) {
            //     consolee.log(`Congrats ${user.emailAddress}, you've logged in!`)
            // req.currentUser = user;
            // } else {
            //     message = `Authentication failed for user ${user.emailAddress}`
            // }
        // } else {
        //     message = `User not found for email: ${user.emailAddress}`
    } 
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({message: 'Access Denied'});
    } else {
    next();
}
}