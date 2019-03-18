import Document from '../../models/Document';

export default async (request, response) => {
    try {
        await Document.find()
            .sort('-created_at')
            .exec((error, documents) => {
                if (error) {
                    return response.status(500).send(error);
                }
                return response.json({ documents });
            });
    } catch (error) {
        response.send(error);
    }
};
