import Express from 'express';
import BodyParser from 'body-parser';
import documents from './routes/DocumentRoutes';
import stats from './routes/ServerStatsRoutes';
import connectToDb from './db/connect';
import SwaggerUi from 'swagger-ui-express';
import Config from './config';
const swaggerDocument = require('./docs/swagger');

const port = Config.port;
const app = Express();

connectToDb();

app.use(BodyParser.json());
app.use(
    BodyParser.urlencoded({
        extended: false
    })
);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to documents api.' });
});

app.use('/api/v1', documents);
app.use('/api/v1', stats);

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});
