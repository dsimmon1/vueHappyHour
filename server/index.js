const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const restaurants = require('./routes/api/restaurants');
const key = require('./routes/api/key');
const users = require('./routes/api/users');

app.use('/api/restaurants', restaurants);
app.use('/api/key', key);
app.use('/api/users', users);

//use the passport middleware

app.use(passport.initialize())
require('./config/passport')(passport);

//handle production

if(process.env.NODE_ENV === 'production') {
    //static folder

    app.use(express.static(__dirname + '/public/'));

    //handle spa
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
