const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const secret = require('../config/variables').secret;

const userSchema = new Schema({
    "email": {type: String, required: true, unique: true},
    "username": {type: String, required: true, unique: true},
    "password": {type: String, required: true},
    "bio": {type: String},
    "image": {type: String},
    // "events":{type: [Schema.Types.ObjectId], ref: "Event"}
}, {timestamps: true})

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

userSchema.pre('save', function(next) {
    if(this.password && this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10)
        next()
    } else {
        next()
    }
});

userSchema.methods.validatePassword = function(password) {
    return this.password ? bcrypt.compareSync(password, this.password) : null;
}

userSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign({
        userId: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };

userSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    };
};

userSchema.methods.toUserJSON = function(){
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image
    };
};


module.exports = mongoose.model('User', userSchema);