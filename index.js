require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(routes);

app.listen(process.env.PORT || 2022,()=>{console.log("server running")});


