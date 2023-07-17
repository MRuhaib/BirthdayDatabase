const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require("dotenv");
const routes = require('./routes/routes');

dotenv.config();

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));

const dbURI = process.env.mongo_uri;
try{
    let connection = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Connected to the database successfully');
    app.listen(8080);
} catch(err) {
    console.error(err);
};

app.use(routes);