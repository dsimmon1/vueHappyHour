var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var PagesSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    meta: {
        type: Object,
        required: true,
    },
    route: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    restaurant: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
});

// This creates our model from the above schema, using mongoose's model method
var Pages = mongoose.model("pages", PagesSchema);

// Export the Pages model
module.exports = Pages;
