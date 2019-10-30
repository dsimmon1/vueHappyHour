const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Key
router.get('/', async (req, res) => {
    const key = await loadApiKey();
    res.send(await key.find({}).toArray());
});


async function loadApiKey() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://dianna:password@ds153958.mlab.com:53958/drinx-dev', {
        useNewUrlParser: true
    });
    return client.db('drinx-dev').collection('keys');
}

module.exports = router;
