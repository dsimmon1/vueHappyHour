var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var RestaurantsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true,
        trim: true
    },
    Monday: {
        type: Object,
        required: true
    },
    Tuesday: {
        type: Object,
        required: true
    },
    Wednesday: {
        type: Object,
        required: true
    },
    Thursday: {
        type: Object,
        required: true
    },
    Friday: {
        type: Object,
        required: true
    },
    Saturday: {
        type: Object,
        required: true
    },
    Sunday: {
        type: Object,
        required: true
    },
    geometry: {
    type: Object,
        required: true
    }
});

// This creates our model from the above schema, using mongoose's model method
var Restaurants = mongoose.model("nhresturants", RestaurantsSchema);

// Export the Restaurants model
module.exports = Restaurants;
