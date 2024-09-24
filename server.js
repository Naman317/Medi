const express =require('express');
const colors=require('colors');
const dotenv=require('dotenv');
const morgan=require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

const app=express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan ('dev'));


app.use('/api/v1/user', require('./routes/userRoutes'));
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server Running in ${process.env.MODE} Mode on port ${process.env.PORT}`);
});