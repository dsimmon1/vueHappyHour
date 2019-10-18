const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const restaurants = require('./routes/api/restaurants');

app.use('/api/restaurants', restaurants);

//handle production

if(process.env.NODE_ENV === 'production') {
    //static folder

    app.use(express.state(__dirname + '/public/'));

    //handle spa
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
