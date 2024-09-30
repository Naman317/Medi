const express =require('express');
const colors=require('colors');
const dotenv=require('dotenv');
const morgan=require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');
const run = require('./ai');
const app=express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan ('dev'));



app.post('/api/v1/advice', async (req, res) => {
  try {
    const symptom = req.body.symptom;
    const advice = await run(symptom);
    res.json({ advice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate advice' });
  }
});



app.use('/api/v1/admin', require('./routes/adminRoutes'));

app.use('/api/v1/user', require('./routes/userRoutes'));
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server Running in ${process.env.MODE} Mode on port ${process.env.PORT}`);
});