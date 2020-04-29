const db = require("../models");


// Defining methods for the keyController

module.exports = {
    findAll: function(req, res) {
        db.Keys
            .find({})
            .then(keys => res.send(keys))
            .catch(err => res.status(422).json(err));
    },
};
