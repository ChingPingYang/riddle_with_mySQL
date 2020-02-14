const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const router = require('./routes/route');
const mysqlDB = require('./util/mysqlDB');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(router);

app.use(express.static('./public'));

mysqlDB.connectToMySQL(()=>{
    app.listen(3000, () => {
        console.log('Server is up and running')
    });
})