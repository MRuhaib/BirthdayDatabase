const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BDSchema = new Schema({
    Person: {
        type: String,
        required: true
    },
    Birthday: {
        type: String,
        required: true
    }
})

const Birthdays = mongoose.model('Birthday', BDSchema);
module.exports = Birthdays;