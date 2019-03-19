import {Router} from 'express';
import DocumentController from '../controllers/DocumentController';
import ValidatesDocuments from '../services/documents/Validation';

const router = new Router();

// list all documents
router.get('/documents', (request, response) => {
    DocumentController.index(request, response);
});

// get a document by id
router.get('/documents/:id', (request, response) => {
    DocumentController.get(request, response);
});

// insert a new document
router.post('/documents', ValidatesDocuments.create, (request, response) => {
    DocumentController.store(request, response);
});

// update a document
router.put('/documents/:id', ValidatesDocuments.update, (request, response) => {
    DocumentController.update(request, response);
});

// delete a document
router.delete('/documents/:id', (request, response) => {
    DocumentController.destroy(request, response);
});

router.get('/blacklist', (request, response) => {
    DocumentController.getBlacklist(request, response);
});

// set a document as blacklisted
router.post('/documents/:id/blacklist', ValidatesDocuments.setBlacklisted, (request, response) => {
    DocumentController.setBlacklisted(request, response);
});

// removes a document from a blacklist
router.delete('/documents/:id/blacklist', ValidatesDocuments.removeFromBlacklist, (request, response) => {
    DocumentController.removeFromBlacklist(request, response);
});

export default router;
