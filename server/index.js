const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const routes = require("./routes");

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



// Add routes, both API and view
app.use(routes);

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
