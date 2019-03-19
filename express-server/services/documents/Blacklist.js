import Document from '../../models/Document';
import {validationResult} from "express-validator/check";
const blacklist = {};

/**
 * Set a valid document in the blacklist - set's the flag blacklist into true
 * @param request
 * @param response
 */
blacklist.setBlacklisted = (request, response) => {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json(errors.array());
    }

    try {
        Document.findById(request.params.id).exec((error, document) => {
            if (error) {
                return response.status(500).send(error);
            }

            document.blacklist = true;

            document.save((error, saved) => {
                if (error) {
                    return response.status(500).send(error);
                }
                return response.json({
                    document: saved
                });
            });
        });
    } catch (error) {
        response.send(error);
    }
};

/**
 * Remove a valid document from the blacklist - set's the flag blacklist into false
 * @param request
 * @param response
 */
blacklist.removeFromBlacklist = (request, response) => {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json(errors.array());
    }

    try {
        Document.findById(request.params.id).exec((error, document) => {
            if (error) {
                return response.status(500).send(error);
            }

            document.blacklist = false;

            document.save((error, saved) => {
                if (error) {
                    return response.status(500).send(error);
                }
                return response.json({
                    document: saved
                });
            });
        });
    } catch (error) {
        response.send(error);
    }
};

export default blacklist;