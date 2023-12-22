const express = require('express');
const router = express.Router();
const dataController = require('../controller/controller');

//Get top 10 trending topics
router.get('/toptrendingtopics', dataController.getTopTrendingTopics);


//Get top 10 trending topics for current years
router.get('/toptrendingtopicsCurrentYear', dataController.getTopTrendingTopicsCurrentYear);

// Get trending topics by year range
router.get('/trendingtopicsbyyear', dataController.getTrendingTopicsByYearRange);


router.get('/filterData', dataController.filterData);
router.get('/getUniqueTopics', dataController.getUniqueTopics);
router.get('/getUniqueSectors', dataController.getUniqueSector);
router.get('/getUniqueRegions', dataController.getUniqueRegion);
router.get('/getUniqueCountry', dataController.getUniqueCountry);
router.get('/getUniquePestle', dataController.getUniquePestle);
router.get('/getUniqueSource', dataController.getUniqueSource);
router.get('/getUniqueCity', dataController.getUniqueCity);

module.exports = router;
