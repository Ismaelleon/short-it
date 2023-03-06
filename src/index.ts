import express, { Express } from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
import path from 'path';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.listen(port, () => {
	console.log(`app running on port ${port}`);
});
