import Document from '../../models/Document';

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
