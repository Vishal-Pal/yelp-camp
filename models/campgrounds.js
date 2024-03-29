var mongoose = require('mongoose');
var campgroundSchema =new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var Campground = new mongoose.model("Campground", campgroundSchema);

module.exports = mongoose.model("Campground", campgroundSchema);