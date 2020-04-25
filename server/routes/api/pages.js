const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Pages

router.get('/', async (req, res) => {
    console.log('it 3')
    try {
        const pages = await loadPagesRouteCollection();
        res.send(await pages.find({}).toArray());
    } catch (err) {
        console.log(err)
    }
});

//Get One Page

router.get('/:identifier', async (req, res) => {
    console.log(req.params.identifier)
    const pages = await loadPagesRouteCollection();
    res.send(await pages.find({'route': req.params.identifier}).toArray());
});




async function loadPagesRouteCollection() {
    try {
        const client = await mongodb.MongoClient.connect
        ('mongodb://dianna:password@ds153958.mlab.com:53958/drinx-dev', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        return client.db('drinx-dev').collection('pages');
    } catch(e) {
        console.log('Error happend while connecting to the DB: ', e.message)
    }

}

module.exports = router;
