const mongoose = require('mongoose');
const slugger = require('slugger');
var slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    "slug": {type: String, unique: true},
    "occasion": {type: String, required: true},
    "eventName": {type: String, required: true, unique: true},
    "date": {type: String , required: true},
    "gifts":[{type: Schema.Types.ObjectId, ref: "Gift"}],
    "user": {type: Schema.Types.ObjectId, ref: "User"},
    "eventAddress": {type: Schema.Types.ObjectId, ref: "Address"},
}, {timestamps: true});

eventSchema.plugin(uniqueValidator, {message: 'is already taken'});

eventSchema.pre('save', function(next){
    if(!this.slug)  {
      this.slugify();
    }
    next();
  });


  eventSchema.methods.slugify = function() {
    this.slug = slug(this.eventName) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
  };

  eventSchema.methods.toJSONFor = function(){
    return {
      slug: this.slug,
      occasion: this.occasion,
      eventName: this.eventName,
      date: this.date,
      gifts: this.gifts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      user: this.user.toUserJSON()
    };
  };
module.exports = mongoose.model('Event', eventSchema);

