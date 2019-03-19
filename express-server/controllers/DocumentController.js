import Create from '../services/documents/Create';
import Update from '../services/documents/Update';
import Delete from '../services/documents/Delete';
import Read from '../services/documents/Read';
import List from '../services/documents/List';

const DocumentController = {};

DocumentController.index = async (request, response) => {
    return await List(request, response);
};

DocumentController.get = async (request, response) => {
    return await Read(request, response);
};

DocumentController.store = async (request, response) => {
    return await Create(request, response);
};

DocumentController.update = async (request, response) => {
    return await Update(request, response);
};

DocumentController.destroy = async (request, response) => {
    return await Delete(request, response);
};

export default DocumentController;
