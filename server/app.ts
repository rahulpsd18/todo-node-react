import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import router from './routes';

type Request = express.Request;
type Response = express.Response;

// Create Express server
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
    .then(() => { console.log('MongoDB connected.'); })
    .catch(err => { console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err); });

mongoose.set('useCreateIndex', true);  // Added to silence the deprecation warning on index creations.

// Express configuration
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(router);

// ping
app.get('/ping', (req: Request, res: Response) => {
    console.log(`Ping received successfully at ${new Date()}`);
    res.send('Pong');
});

export default app;
