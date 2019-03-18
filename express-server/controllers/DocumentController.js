import Document from "../models/Document";
import Cuid from "cuid";
import Slug from "limax";
import SanitizeHtml from "sanitize-html";

const DocumentController = {};

DocumentController.index = async (request, response) => {
    try {
        await Document.find()
            .sort("-created_at")
            .exec((error, documents) => {
                if (error) {
                    response.status(500).send(error);
                }
                response.json({ documents });
            });
    } catch (error) {
        response.send(error);
    }
};

DocumentController.get = async (request, response) => {
    try {
        Document.findOne({ cuid: request.params.cuid }).exec((error, document) => {
            if (error) {
                response.status(500).send(error);
            }
            response.json({ document });
        });
    } catch (error) {
        response.send(error);
    }
};

DocumentController.post = async (request,response) => {
    
}
