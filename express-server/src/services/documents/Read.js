import Document from '../../models/Document';

/**
 * Get a document if it exists
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export default async (request, response) => {
    try {
        Document.findById(request.params.id).exec((error, document) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.json({ document });
        });
    } catch (error) {
        response.send(error);
    }
};
