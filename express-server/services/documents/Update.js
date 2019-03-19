import Document from '../../models/Document';
import SanitizeHtml from 'sanitize-html';
import { validationResult } from 'express-validator/check';

export default async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json(errors.array());
    }

    try {
        Document.findById(request.params.id).exec((error, document) => {
            if (error) {
                return response.status(500).send(error);
            }

            document.name = SanitizeHtml(request.body.name) || document.name;
            document.number =
                SanitizeHtml(request.body.number) || document.number;
            document.type = SanitizeHtml(request.body.type) || document.type;

            document.save((error, saved) => {
                if (error) {
                    return response.status(500).send(error);
                }
                response.json({
                    document: saved
                });
            });
        });
    } catch (error) {
        response.send(error);
    }
};
