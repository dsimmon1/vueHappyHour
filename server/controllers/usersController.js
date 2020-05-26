const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');



// Defining methods for the usersController

module.exports = {
    findSpecificUser: function (req, res)  {
        db.Users
            .findById(req.params.id)
            .then(results => res.send(results))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Users
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.status(200).json({
                success: true,
                msg: "User updated."
            }))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Users
            .findById({ _id: req.params.id })
            .then(dbModel =>{
                dbModel.remove()
                res.status(200).json({
                success: true,
                msg: "User deleted."
            })})
            .catch(err => res.status(422).json(err));
    }
};
