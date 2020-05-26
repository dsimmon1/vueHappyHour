const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require("../../models");
const usersController = require("../../controllers/usersController");


const router = express.Router();

//Get All Users
router.get('/users',  (req, res) => {
    db.Users
        .find({})
        .then(dbRestaurants => res.send(dbRestaurants))
        .catch(err => res.status(422).json(err));
});

//Get Routes with id as param

router.route('/:id')
    .get(usersController.findSpecificUser)
    .put(usersController.update)
    .delete(usersController.remove);

//Get A User
router.get('/profile', passport.authenticate('jwt',
    {session: false
    }), (req, res) => {
    return res.json({
        user: req.user
    })
});

//Add Post

router.post('/register', (req, res) => {

    if (req.body.password !== req.body.confirm_password) {
        return res.status(400).json({
            msg: "Password do not match."
        })
    }
    else {
        db.Users.findOne({

            $or: [
                { username: req.body.username},
                {email: req.body.email}
            ]
        }).then (user => {
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

                    db.Users.create({
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        createdAt: a,
                        updatedAt: ''
                    }).then( user => {
                        return res.status(201).json({
                            success: true,
                            msg: "User is now registered."
                        })
                    })

                })

            }
        })
    }





});

//Get User

router.post('/login', (req, res) => {
    db.Users.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Username is not found.",
                success: false
            });
        }
        else {
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                console.log(isMatch);
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
    })
})

module.exports = router;
