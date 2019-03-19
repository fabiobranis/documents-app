import { Router } from 'express';
import DocumentController from '../controllers/DocumentController';
import ValidatesDocuments from '../services/documents/Validation';

const router = new Router();

router.get('/documents', (request, response) => {
    DocumentController.index(request, response);
});

router.get('/documents/:id', (request, response) => {
    DocumentController.get(request, response);
});

router.post('/documents', ValidatesDocuments.create, (request, response) => {
    DocumentController.store(request, response);
});

router.put('/documents/:id', ValidatesDocuments.update ,(request, response) => {
    DocumentController.update(request, response);
});

router.delete('/documents/:id', (request, response) => {
    DocumentController.destroy(request, response);
});

export default router;
