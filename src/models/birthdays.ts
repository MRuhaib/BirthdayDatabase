import mongoose from 'mongoose';
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

let Birthday = mongoose.model('Birthday', BDSchema);
export default Birthday;