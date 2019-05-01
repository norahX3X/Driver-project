const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    model: {type: String, required:false},
     type: String,
     image: String,
      year: Number,
      color: {type: String, required:false}
});
const Car = mongoose.model('Car', carSchema);
module.exports = Car;