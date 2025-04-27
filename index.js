const express = require('express');
const { db } = require('./configs/database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = 8089;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', require('./routers'));

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server started on http://localhost:${port}`);
        db();
    } else {
        console.error("Server failed to start", err);
    }
});
