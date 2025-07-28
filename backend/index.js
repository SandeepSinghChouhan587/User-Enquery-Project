const express = require('express');
const mongoose = require('mongoose');
const studentRouter = require('./App/routes/user/student');
const enqueryRouter = require('./App/routes/user/enquery');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/student', studentRouter);
app.use('/api/enquery', enqueryRouter);



app.listen(process.env.PORT);