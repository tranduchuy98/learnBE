import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index.js';
import {initData} from './controller/init_controller.js';

import dotenv from "dotenv";
dotenv.config();

const app = express();


app.use(cors({
    credentials:true
}));

app.use(cookieParser());
app.use(bodyParser.json());



const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log('server is running');
});


mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('error', (error) => console.log(error))
mongoose.connection.on('connected', () => {
    console.log('connected DB success')
});

initData();

app.use('/', router());