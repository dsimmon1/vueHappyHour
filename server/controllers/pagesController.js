const db = require("../models");



// Defining methods for the pagesController

module.exports = {
    findAll: function(req, res) {
        db.Pages
            .find({})
            .then(dbRestaurants => res.send(dbRestaurants))
            .catch(err => res.status(422).json(err));
    },
    findSpecificPage: function(req, res) {
        db.Pages
            .find({ route: req.params.identifier})
            .then(results => res.send(results))
            .catch(err => res.status(422).json(err));

    },
    create: function(req, res) {
        db.Pages
            .create(req.body)
            .then(dbModel => res.status(201).json({
                success: true,
                msg: "New pages added."
            }))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Pages
            .findOneAndUpdate({ _id: req.params.identifier }, req.body)
            .then(dbModel => res.status(200).json({
                success: true,
                msg: "Blog post updated."
            }))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Pages
            .findById(req.params.identifier)
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.status(200).json({
                success: true,
                msg: "Blog post deleted."
            }))
            .catch(err => res.status(422).json(err));
    }
};
