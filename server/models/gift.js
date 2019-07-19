const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftSchema = new Schema({
    "name": {type: String, required: true},
    "itemURL": {type: String, required: true},
    "price": {type: Number, required: true},
    "isGifted":{type: Boolean, default:false},
    "image": {type: String},
    "giftedBy":{type: String, default:""},
    "event": {type: Schema.Types.ObjectId, ref: "Event"},
}, {timestamps: true});


giftSchema.methods.toJSONFor = function(user){
    return {
      id: this._id,
      name: this.name,
      price: this.price,
      isGifted: this.isGifted,
      giftedBy: this.giftedBy,
      image: this.image,
      createdAt: this.createdAt,
      event: this.event.toJSONFor()
    };
  };

module.exports = mongoose.model('Gift', giftSchema);