import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

const blacklistSchema = new Schema({
    document: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
    created_at: { type: Date, default: Date.now },
    removed_at: { type: Date }
});

let Blacklist = Mongoose.model('Blacklist', blacklistSchema);

export default Blacklist;
