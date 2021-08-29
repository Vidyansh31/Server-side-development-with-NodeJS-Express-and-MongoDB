var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Using passport-local-mongoose
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin : {
        type: Boolean,
        default: false
    }
});

// This will automatically add username and hashed storage of password using salt and hash
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',User);