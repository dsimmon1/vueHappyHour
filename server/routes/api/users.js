const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

//Get All Users
router.get('/', async (req, res) => {
    const users = await loadUsers();
    res.send(await users.find({}).toArray());
});

//Get A User
router.get('/profile', passport.authenticate('jwt',
    {session: false
    }), (req, res) => {
    return res.json({
        user: req.user
    })
});

//Add Post

router.post('/register', async(req, res) => {
    const users = await loadUsers();

    if (req.body.password !== req.body.confirm_password) {
        return res.status(400).json({
            msg: "Password do not match."
        })
    }
    else {
        await users.findOne({

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

                    users.insertOne({
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

router.post('/login', async(req, res) => {
    const users = await loadUsers();
    await users.findOne({
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

async function loadUsers() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://dianna:password@ds153958.mlab.com:53958/drinx-dev', {
        useNewUrlParser: true
    });
    return client.db('drinx-dev').collection('users');
}

module.exports = router;
