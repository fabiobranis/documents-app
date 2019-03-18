import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const documentSchema = new Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ["Person", "Company"],
        default: "Company"
    },
    slug: { type: String, required: true },
    cuid: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

let Document = Mongoose.model("Document", documentSchema);

export default Document;
