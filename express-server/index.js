import Express from 'express';
import BodyParser from 'body-parser';
import documents from './routes/DocumentRoutes';
import blacklists from './routes/BlackListRoutes';
import connectToDb from './db/connect';

const port = 3000;
const app = Express();

connectToDb();

app.use(BodyParser.json());
app.use(
    BodyParser.urlencoded({
        extended: false
    })
);

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to documents api.' });
});

app.use('/api', documents);
app.use('/api', blacklists);

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});
