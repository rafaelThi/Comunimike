import 'reflect-metadata';
import connect from './index';
import cors = require('cors');
import express = require('express');
import routes from './routes'

const app = express();
app.use(cors());
app.use(express.json());
connect();

app.use(routes);


app.listen(3330);
