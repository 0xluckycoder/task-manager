import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import cookieParser from 'cookie-parser';

import userRoutes from './v1/api/users';
import errorHandler from './middleware/errorHandler';

require('dotenv').config();

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.cd7fxox.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error ❌"));
db.once("open", () => {
    console.log("connected successfully")
});

// config logger
app.use(morgan('common'));

app.use(express.json());
app.use(cookieParser());

// config cors
app.use(cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.json({
        message: 'api root 🌳'
    });
});

app.use('/api/v1/users', userRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
});