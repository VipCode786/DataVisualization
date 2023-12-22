const express = require('express');
const mongoose = require('mongoose');
const TestdataModel = require('./model/testdata');
const controller = require('./controller/controller');
const routeapi = require('./routes/routeapi');
const cors = require('cors'); // Import cors


const app = express();

app.use(cors()); 

mongoose.connect('mongodb://localhost:27017/DataVisualization')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Get top 10 trending topics
app.use('/api', routeapi);
// // Get trending topics by year range
// app.get('/api/trendingtopicsbyyear', controller.getTrendingTopicsByYearRange);
// app.get('/api/trendingtopicsbyyear', controller.getTrendingTopicsByYearRange);

app.listen(3011, () => {
  console.log('Server is running on port 3011');
});
