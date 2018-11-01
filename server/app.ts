import * as path from 'path';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import router from './routes';

type Request = express.Request;
type Response = express.Response;

// Create Express server
const app = express();

app.use(cors({  
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL as string, { useNewUrlParser: true })
    .then(() => { console.log('MongoDB connected.'); })
    .catch(err => { console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err); });

mongoose.set('useCreateIndex', true);  // Added to silence the deprecation warning on index creations.

// Express configuration
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(router);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;
