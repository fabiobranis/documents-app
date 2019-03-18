import Document from '../../models/Document';

export default async (request, response) => {
    try {
        Document.findById(request.params.id).exec((error, document) => {
            document.demove(() => {
                response.status(200).end();
            });
        });
    } catch (error) {
        response.send(error);
    }
};
