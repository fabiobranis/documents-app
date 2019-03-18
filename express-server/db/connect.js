import Mongoose from "mongoose";
import Config from "../config/index";

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    try {
        await Mongoose.connect(Config.mongoUrl, {
            useMongoClient: true
        });
    } catch (error) {
        throw error;
    }
};

export default connectToDb;
