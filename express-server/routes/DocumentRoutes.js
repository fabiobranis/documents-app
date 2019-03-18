import { Router } from 'express';
import DocumentController from '../controllers/DocumentController';
const router = new Router();

router.get('/documents', (request, response) => {
    DocumentController.index(request, response);
});

router.get('/documents/:id', (request, response) => {
    DocumentController.get(request, response);
});

router.post('/documents', (request, response) => {
    DocumentController.store(request, response);
});

router.put('/documents/:id', (request, response) => {
    DocumentController.update(request, response);
});

router.delete('/documents/:id', (request, response) => {
    DocumentController.destroy(request, repsonse);
});

export default router;
