const TestdataModel = require('../model/testdata');

// Get top 10 trending topics
exports.getTopTrendingTopics = async (req, res) => {

  try {
    const topTrendingTopics = await TestdataModel.aggregate([
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, topic: '$_id', count: 1 } }
    ]);
    res.json(topTrendingTopics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getTopTrendingTopicsCurrentYear = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
   console.log("Full Year",currentYear)
    const topTrendingTopics = await TestdataModel.aggregate([
      { $match: { start_year: currentYear } }, // Filter by the current year
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, topic: '$_id', count: 1 } }
    ]);
    
    res.json(topTrendingTopics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get trending topics within a specific range of years
exports.getTrendingTopicsByYearRange = async (req, res) => {
  const { startYear, endYear } = req.query;
  try {
    const trendingTopicsByYear = await TestdataModel.aggregate([
      {
        $match: {
          $and: [
            { start_year: { $gte: parseInt(startYear) } },
            { end_year: { $lte: parseInt(endYear) } },
          ],
        },
      },
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { _id: 0, topic: '$_id', count: 1 } }
    ]);
    res.json(trendingTopicsByYear);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get topics with start date or end date


exports.getTopicswithDates = async(req,res)=>{
  try {
    const keyword = req.query.keyword; // Assuming keyword is passed as a query parameter
    const startDate = req.query.startDate; // Date format: YYYY-MM-DD
    const endDate = req.query.endDate; // Date format: YYYY-MM-DD

    let query = { topic: { $regex: keyword, $options: 'i' } };

    // Adding date range filtering if start and end dates are provided
    if (startDate && endDate) {
      query = {
        ...query,
        $or: [
          { start_year: { $gte: new Date(startDate).getFullYear(), $lte: new Date(endDate).getFullYear() } },
          { end_year: { $gte: new Date(startDate).getFullYear(), $lte: new Date(endDate).getFullYear() } }
        ]
      };
    }

    const topics = await TestdataModel.find(query);

    res.json({ topics });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getUniqueTopics = async(req,res) =>{
  try {
    const uniqueTopics = await TestdataModel.distinct('topic');
    res.status(200).json({ topics: uniqueTopics });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.getUniqueSector = async(req,res) =>{
  try {
    const uniqueSector = await TestdataModel.distinct('sector');
    res.status(200).json({ sectors: uniqueSector });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getUniqueRegion = async(req,res) =>{
  try {
    const uniqueRegion = await TestdataModel.distinct('region');
    res.status(200).json({ regions: uniqueRegion });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.getUniqueCountry = async(req,res) =>{
  try {
    const uniqueCountry = await TestdataModel.distinct('country');
    res.status(200).json({ country: uniqueCountry });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getUniqueCity = async(req,res) =>{
  try {
    const uniqueCity = await TestdataModel.distinct('city');
    res.status(200).json({ city: uniqueCity });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getUniquePestle = async(req,res) =>{
  try {
    const uniquePestle = await TestdataModel.distinct('pestle');
    res.status(200).json({ pestle: uniquePestle });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.getUniqueSource = async(req,res) =>{
  try {
    const uniqueSource = await TestdataModel.distinct('source');
    res.status(200).json({ source: uniqueSource });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
// exports.filterTestData = async(req, res)=> {
//   console.log("hello")
//     try {
//       const {
//         startYear,
//         endYear,
//         topics,
//         sector,
//         region,
//         pestle,
//         source,
//         country,
//         city
//       } = req.query;
//       console.log("hello")
//       const filter = {};
//       if (endYear) filter.start_year = parseInt(startYear);
//       if (endYear) filter.end_year = parseInt(endYear);
//       if (topics) filter.topic = { $in: Array.isArray(topics) ? topics : [topics] };
//       if (sector) filter.sector = sector;
//       if (region) filter.region = region;
//       if (pestle) filter.pestle = pestle;
//       if (source) filter.source = source;
//       if (country) filter.country = country;
//       if (city) filter.city = city;
//       console.log("filter",filter)

//       const filteredData = await TestdataModel.find(filter);
//      console.log("filteredData",filteredData)
//       res.json({ data: filteredData });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   }

// Get top 10 trending topics
// exports.filterData = async (req, res) => {
//   console.log("Received query parameters:");
//   try {
//     const {
//       startYear,
//       endYear,
//       topics,
//       sector,
//       region,
//       pestle,
//       source,
//       country,
//       city
//     } = req.query;

//     console.log("Received query parameters:", req.query);

//     const filter = {};
//     if (startYear) filter.start_year = parseInt(startYear);
//     if (endYear) filter.end_year = parseInt(endYear);
//     if (topics) filter.topic = { $in: Array.isArray(topics) ? topics : [topics] };
//     if (sector) filter.sector = sector;
//     if (region) filter.region = region;
//     if (pestle) filter.pestle = pestle;
//     if (source) filter.source = source;
//     if (country) filter.country = country;
//     if (city) filter.city = city;

//     console.log("Constructed filter:", filter);

//     const filteredData = await TestdataModel.find(filter);
//     console.log("Filtered Data:", filteredData);

//     res.json({ data: filteredData });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
  
// };


exports.filterData = async (req, res) => {
  console.log("Received query parameters:");
  try {
    const {
      startYear,
      endYear,
      topics,
      sector,
      region,
      pestle,
      source,
      country,
      city
    } = req.query;

    console.log("Received query parameters:", req.query);

    const filter = {};
    if (startYear) filter.start_year = { $gte: parseInt(startYear) };
    if (endYear) filter.end_year = { $lte: parseInt(endYear) };
    
    if (topics) filter.topic = { $in: Array.isArray(topics) ? topics : [topics] };
    if (sector) filter.sector = sector;
    if (region) filter.region = region;
    if (pestle) filter.pestle = pestle;
    if (source) filter.source = source;
    if (country) filter.country = country;
    if (city) filter.city = city;


    console.log("Constructed filter:", filter);

    const filteredData = await TestdataModel.find(filter);
    console.log("Filtered Data:", filteredData);

    res.json({ data: filteredData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
