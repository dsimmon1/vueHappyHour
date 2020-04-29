var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var KeySchema = new Schema({
    key: {
        type: String,
        required: true
    }
});

// This creates our model from the above schema, using mongoose's model method
var Keys = mongoose.model("keys", KeySchema);

// Export the Restaurants model
module.exports = Keys;
