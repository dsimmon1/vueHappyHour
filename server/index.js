const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const restaurants = require('./routes/api/restaurants');

app.use('/api/restaurants', restaurants)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
