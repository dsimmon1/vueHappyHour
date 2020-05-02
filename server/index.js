const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const routes = require("./routes");
const db = require("./models");const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const app = express();

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cors());

const mongoURI = 'mongodb://dianna:password@ds153958.mlab.com:53958/drinx-dev';

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || mongoURI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function(error){
        if(error){
            console.log(error);
        }else{
            console.log("Connected to the database");
        }
    });




//use the passport middleware

app.use(passport.initialize())
require('./config/passport')(passport);

// Add routes, both API and view
app.use(routes);

app.post('/api/users/login', (req, res) => {
     db.Users.find({
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


//handle production

if(process.env.NODE_ENV === 'production') {
    //static folder

    app.use(express.static(__dirname + '/public/'));

    //handle spa
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
