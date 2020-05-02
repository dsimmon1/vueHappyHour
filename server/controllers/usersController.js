const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');



// Defining methods for the usersController

module.exports = {
    findAll: function(req, res) {
        db.Users
            .find({})
            .then(dbRestaurants => res.send(dbRestaurants))
            .catch(err => res.status(422).json(err));
    },
    findSpecificProfile: function ()  {
        passport.authenticate('jwt',
            {session: false
            },function (req, res) {
            console.log('hello')
            return res.json({
                user: req.user
            })

        })
    },
    register: function(req, res) {
        let insertUser = req.body;
        if (req.body.password !== req.body.confirm_password) {
            return res.status(400).json({
                msg: "Password do not match."
            })
        }
        else {
            db.Users
                .find({$or: [
                { username: req.body.username},
                {email: req.body.email}]})
                .then( user => {
                        if (user) {
                            return res.status(400).json({
                                msg: "User already exists."
                            });
                        }
                        else {
                            const saltRounds = 10;
                            var d = Date(Date.now());
                            let a = d.toString();

                            bcrypt.hash(req.body.password, saltRounds, function(err, hash)  {
                                if (err) throw err;

                                db.Users.create({insertUser})
                                    .then( dbUser => {
                                    return res.status(201).json({
                                        success: true,
                                        msg: "User is now registered."
                                    }).catch(err => res.status(422).json(err));
                                })

                            })

                        }
                    }

                )

        }
    },
    login: function(req, res) {
        console.log('hello')
        db.Users
        .find({
            username: req.body.username
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    msg: "Username is not found.",
                    success: false
                });
            }
            else {
                console.log('hello')
                bcrypt.compare(req.body.password, user.password).then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            _id: user._id,
                            username: user.username,
                            name: user.name,
                            email: user.email
                        }
                        jwt.sign(payload, 'yoursecret', {expiresIn:604800}, (err, token) =>
                        {
                            return res.status(200).json({
                                token: `Bearer ${token}`,
                                user: user,
                                success: true,
                                msg: "You are now logged in."
                            });
                        });

                    }else {
                        return res.status(404).json({
                            msg: "Incorrect Password.",
                            success: false
                        });
                    }
                })

            }
        }).catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Users
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.status(200).json({
                success: true,
                msg: "Blog post updated."
            }))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Users
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.status(200).json({
                success: true,
                msg: "Blog post deleted."
            }))
            .catch(err => res.status(422).json(err));
    }
};
