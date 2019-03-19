import Document from '../../models/Document';
import Slug from 'limax';
import SanitizeHtml from 'sanitize-html';
import { validationResult } from 'express-validator/check';

/**
 * Handles the creation of a Document in database
 * @param request
 * @param response
 * @returns {Promise<*|Promise<any>>}
 */
export default async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json(errors.array());
    }

    try {
        const document = new Document();

        document.name = SanitizeHtml(request.body.name);
        document.number = SanitizeHtml(request.body.number);
        document.type = SanitizeHtml(request.body.type);

        document.slug = Slug(document.name.toLowerCase(), { lowercase: true });

        document.save((error, saved) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.json({
                document: saved
            });
        });
    } catch (error) {
        throw error;
    }
};
