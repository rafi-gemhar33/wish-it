const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    "name": {type: String},
    "phone": {type: Number},
    "pin": {type: Number},
    "line1": {type: String, required: true},
    "line2": {type: String},
    "city": {type: String, required: true},
    "state": {type: String},
    "user": {type: Schema.Types.ObjectId, ref: "User"},
});

addressSchema.methods.toAddressJSON = function(){
    return {
        "name": this.name,
        "phone": this.phone,
        "pin": this.pin,
        "line1": this.line1,
        "line2": this.line2,
        "city": this.city,
        "state": this.state,

    };
};

module.exports = mongoose.model('Address', addressSchema);