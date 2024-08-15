import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index.js'
import BaseResponse from "./model/base_respone.js";
import {getRole} from "./database/role_db.js";
import {getUsers} from "./database/user_db.js";

const app = express();

app.use(cors({
    credentials:true
}));

app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => {
    console.log('server is running');
});

const DB_URL=  "mongodb+srv://huyducdev98:Zxczxc123@learnapi.g4wjs4z.mongodb.net/?retryWrites=true&w=majority&appName=learnAPI"

mongoose.Promise = Promise;
mongoose.connect(DB_URL);
mongoose.connection.on('error', (error) => console.log(error))
mongoose.connection.on('connected', () => {
    console.log('connected DB success')

});

const user = await getRole()
console.log(user);

app.use('/', router());