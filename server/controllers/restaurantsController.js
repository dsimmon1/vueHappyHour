const db = require("../models");

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


let milesToRadian = function(miles){
    var earthRadiusInMiles = 3959;
    return miles / earthRadiusInMiles;
};

// Defining methods for the restaurantsController

module.exports = {
    findAll: function(req, res) {
        db.Restaurants
            .find({})
            .then(dbRestaurants => res.send(dbRestaurants))
            .catch(err => res.status(422).json(err));
    },
    findInArea: function(req, res) {
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
        db.Restaurants
            .find(query)
            .then(results => res.send(results))
            .catch(err => res.status(422).json(err));

    },
    findSpecificRestaurant: function(req, res) {
        db.Restaurants
            .findById(req.params.id)
            .then(results => res.send(results))
            .catch(err => res.status(422).json(err));

    },
    create: function(req, res) {
        db.Restaurants
            .create(req.body)
            .then(dbModel => res.status(201).json({
                success: true,
                msg: "New restaurant added."
            }))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Restaurants
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.status(200).json({
                success: true,
                msg: "Restaurant updated."
            }))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Restaurants
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.status(200).json({
                success: true,
                msg: "Restaurant deleted."
            }))
            .catch(err => res.status(422).json(err));
    }
};
