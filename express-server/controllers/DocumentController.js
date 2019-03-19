import Create from '../services/documents/Create';
import Update from '../services/documents/Update';
import Delete from '../services/documents/Delete';
import Read from '../services/documents/Read';
import List from '../services/documents/List';

const DocumentController = {};

/**
 * List all documents
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
DocumentController.index = async (request, response) => {
    return await List(request, response);
};

/**
 * Return a document
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
DocumentController.get = async (request, response) => {
    return await Read(request, response);
};

/**
 * Store a document
 * @param request
 * @param response
 * @returns {Promise<*|Promise<any>>}
 */
DocumentController.store = async (request, response) => {
    return await Create(request, response);
};

/**
 * Update a document
 * @param request
 * @param response
 * @returns {Promise<*|Promise<any>>}
 */
DocumentController.update = async (request, response) => {
    return await Update(request, response);
};

/**
 * Destroy a document
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
DocumentController.destroy = async (request, response) => {
    return await Delete(request, response);
};

export default DocumentController;
