import Document from '../../models/Document';
import {MongooseQueryParser} from 'mongoose-query-parser';

/**
 * Returns the index of documents
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export default async (request, response) => {

    try {

        const parser = new MongooseQueryParser();
        const parsed = parser.parse(request.query);
        console.log(parsed);
        await Document.find()
            .sort('-created_at')
            .exec((error, documents) => {
                if (error) {
                    return response.status(500).send(error);
                }
                return response.json({documents});
            });
    } catch (error) {
        response.send(error);
    }
};
