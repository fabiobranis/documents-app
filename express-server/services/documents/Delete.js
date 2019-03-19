import Document from '../../models/Document';

/**
 * Delete a document, if it exists
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export default async (request, response) => {
    try {
        Document.findById(request.params.id).exec((error, document) => {
            if (!document) {
                return response.json({ message: 'No document to delete' });
            }
            document.remove(() => {
                response.status(200).json({ message: 'Document deleted' });
            });
        });
    } catch (error) {
        response.send(error);
    }
};
