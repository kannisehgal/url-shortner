const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require("body-parser");


const urlencodedParser = bodyParser.urlencoded({ extended: false});

// Middleware
app.use(express.json())
app.set('view engine', 'ejs')

const db = 'mongodb://localhost/url-shortener'

mongoose
    .connect(db, {
        useNewUrlParser : true,
        useCreateIndex : true,
        useUnifiedTopology : true,
        useFindAndModify : false
    })
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error: '+err))

app.use('/', require('./routes/url'))

app.listen(5000, () => console.log('Server is running on PORT 5000'))









