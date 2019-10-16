const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const nhresturants = await loadPostsCollection();
    res.send(await nhresturants.find({}).toArray());
});

//Add Post

router.post('/', async(req, res) => {
    const nhresturants = await loadPostsCollection();
    await nhresturants.insertOne({
        text: req.body.text,
        name: req.body.name,
        address: req.body.address,
        number: req.body.number,
        Monday: req.body.Monday,
        Tuesday: req.body.Tuesday,
        Wednesday: req.body.Wednesday,
        Thursday: req.body.Thursday,
        Friday: req.body.Friday,
        Saturday: req.body.Saturday,
        Sunday: req.body.Sunday
    });
    res.status(201).send();
});

//Delete Post

router.delete('/:id', async (req, res) => {
    const nhresturants = await loadPostsCollection();
    await nhresturants.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
        ('mongodb://dianna:password@ds153958.mlab.com:53958/drinx-dev', {
        useNewUrlParser: true
        });
    return client.db('drinx-dev').collection('nhresturants');
}

module.exports = router;
