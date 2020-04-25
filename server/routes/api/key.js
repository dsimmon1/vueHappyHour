const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Key
router.get('/', async (req, res) => {
    const key = await loadApiKey();
    res.send(await key.find({}).toArray());
});


async function loadApiKey() {
    try {
        const client = await mongodb.MongoClient.connect
        ('mongodb://dianna:password@ds153958.mlab.com:53958/drinx-dev', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        return client.db('drinx-dev').collection('keys');
    } catch(e) {
        console.log('Error happend while connecting to the DB: ', e.message)
    }
}

module.exports = router;
