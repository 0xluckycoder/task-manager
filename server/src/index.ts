import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

require('dotenv').config();

const app = express();

// config logger
app.use(morgan('common'));

app.use(express.json());
app.use(cookieParser());

// config cors
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.json({
        message: 'api root 🌳'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
});