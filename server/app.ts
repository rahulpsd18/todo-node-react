import * as bodyParser from 'body-parser';
import * as express from 'express';

type Request = express.Request;
type Response = express.Response;

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ping
app.get('/ping', (req: Request, res: Response) => {
    console.log(`Ping received successfully at ${new Date()}`);
    res.send('Pong');
});

export default app;
