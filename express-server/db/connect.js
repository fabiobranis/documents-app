import Mongoose from 'mongoose';
import Config from '../config/index';

/**
 * Returns the Mongoose connection
 * @returns {Promise<void>}
 */
const connectToDb = async () => {
    try {
        await Mongoose.connect(Config.mongoUrl, {
            useNewUrlParser: true
        });
    } catch (error) {
        throw error;
    }
};

export default connectToDb;
