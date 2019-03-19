import Mongoose from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

const Schema = Mongoose.Schema;

const documentSchema = new Schema({
    name: {type: String, required: true},
    number: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Person', 'Company'],
        default: 'Company'
    },
    blacklist: {type: Boolean, default: false},
    slug: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

documentSchema.plugin(MongoosePaginate);

let Document = Mongoose.model('Document', documentSchema);

export default Document;
