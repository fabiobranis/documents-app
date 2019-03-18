import { Router } from 'express';
const router = new Router();

// check if document is blackliste
router.get('/documents/:id/is-blacklisted', (request, response) => {
    response.json({ blacklist: true });
});

// get all blacklist actions
router.get('/documents/:id/blacklist', (request, response) => {});

// set a document as blacklkisted - if it's not
router.post('/documents/:id/blacklist', (request, response) => {});

// release a document from blacklist, if it's blacklisted
router.delete('/documents/:id/blacklist', (request, response) => {});

export default router;
