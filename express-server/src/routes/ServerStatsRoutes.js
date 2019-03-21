import {Router} from 'express';
import ServerStatsController from '../controllers/SeverStatsController';

const router = new Router();

router.get('/stats', (request, response) => {
    return ServerStatsController.get(request, response);
});

export default router;