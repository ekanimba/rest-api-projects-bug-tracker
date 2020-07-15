const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err});
            return;
        }
        if( user ) {
            res.status(400).send({ message: "This Username is already taken"});
            return;
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if(err) {
                res.status(500).send({ message: err});
                return;
            }
            if( user ) {
                res.status(400).send({ message: "This Email is already taken"});
                return;
            }
            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for(let i = 0 ; i < req.body.roles.length; i ++) {
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Role ${req.body.roles[i]} does not exist in our database`
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;
