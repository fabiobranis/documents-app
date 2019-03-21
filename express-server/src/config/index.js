/**
 * Returns the configuration parsed
 */
export default {
    port: 3000,
    mongoUrl:
        `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
            process.env.MONGO_INITDB_ROOT_PASSWORD
            }@${process.env.MONGO_INITDB_DATABASE}:27017/documents?authMechanism=SCRAM-SHA-1&authSource=admin`

};
