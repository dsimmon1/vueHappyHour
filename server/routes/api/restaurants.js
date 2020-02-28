const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

function timeConvertor(time) {
    var PM = time.match('PM') ||  time.match('pm')? true : false

    time = time.split(':')
    var min = time[1];

    let hour;

    if (PM) {
        hour = 12 + parseInt(time[0],10)
        if (time[2]) {
            var sec = time[2].replace('PM', '')
        }
    } else {
        hour = time[0]

        if (hour == 12)
        {
            hour = 0;
        }
        if (time[2]) {
            var sec = time[2].replace('AM', '')
        }
    }
    let hournmin = hour * 60;
    let total = hournmin + parseInt(min, 10);

    return total
}

function getDay() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[d.getDay()];
}
//Get Posts
router.get('/', async (req, res) => {
    const nhresturants = await loadPostsCollection();
    res.send(await nhresturants.find({}).toArray());
});

router.get('/:coords/:second', async (req, res) => {
    const nhresturants = await loadPostsCollection();
    let milesToRadian = function(miles){
        var earthRadiusInMiles = 3959;
        return miles / earthRadiusInMiles;
    };
    let time = timeConvertor(req.params.second);
    let newCoords = req.params.coords.split(",");
    let coords = [];
    newCoords.forEach(element => coords.push(parseFloat(element)));
    let startdate = getDay() + '.hours.0.to';
    let endate = getDay() + '.hours.0.from';
    let secondStart = getDay() + '.hours.1.to';
    let secondEnd = getDay() + '.hours.1.from';
    let thirdStart = getDay() + '.hours.2.to';
    let thirdEnd = getDay() + '.hours.2.from';
    let query = {
        "geometry" : {
            $geoWithin : {
                $centerSphere : [coords, milesToRadian(7) ]
            }
        },
        $or: [{
        $and: [ { [secondStart] : { $lte : time }, }, {  [secondEnd] : { $gte : time } } ]},
            {
        $and: [ { [startdate] : { $lte : time }, }, {  [endate] : { $gte : time } } ]},
            {
                $and: [ { [thirdStart] : { $lte : time }, }, {  [thirdEnd] : { $gte : time } } ]}
        ]

    };
    res.send(await nhresturants.find(query).toArray());
});

//Add Post

router.post('/', async(req, res) => {
    const nhresturants = await loadPostsCollection();
    await nhresturants.insertOne({
        name: req.body.name,
        address: req.body.address,
        number: req.body.number,
        Monday: req.body.Monday,
        Tuesday: req.body.Tuesday,
        Wednesday: req.body.Wednesday,
        Thursday: req.body.Thursday,
        Friday: req.body.Friday,
        Saturday: req.body.Saturday,
        Sunday: req.body.Sunday,
        geometry: req.body.geometry
    }).then ( restaurant => {
        return res.status(201).json({
            success: true,
            msg: "New restaurant added."
        })
    });
});

//Get specific restaurant

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    const nhresturants = await loadPostsCollection();
    res.send(await nhresturants.find({'_id': new mongodb.ObjectID(req.params.id)}).toArray());
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
