import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from "dotenv";
import routes from './routes/routes';

dotenv.config();

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));

const dbURI:any = process.env.mongo_uri;
let connector = async () => {
    try{
        await mongoose.connect(dbURI);
        console.log('Connected to the database successfully');
        app.listen(8080);
    } catch(err) {
        console.error(err);
    };
};
connector();
app.use(routes);