import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopTrendingTopicsChart from './page/TopTrendingTopicsChart';
import TrendingTopicsChart from './page/TrendingTopicsChart';
import ChartComponent from './page/ChartComponent';
import BarChart from './page/BarChart';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PolarChart from './page/PolarChart';

const App = () => {
  const [topTrendingTopics, setTopTrendingTopics] = useState([]);
  const [topicSelect, setSelectTopic] = useState('market');
  const [getTopics, setTopics] = useState();
  const [getSectors, setSectors] = useState();
  const [getCountry, setCountry] = useState();
  const [getRegions, setRegions] = useState();
  const [getPestle, setPestle] = useState();
  const [getCity, setCity] = useState();
  const [getSource, setSource] = useState();
  const [filteredData , setFilteredData]= useState()
  const [formData, setFormData] = useState({
    startYear: '',
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: '',
    city: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleFilterSubmit = async () => {
    try {
      const queryParams = new URLSearchParams(formData).toString();
      console.log('queryParams', queryParams);
      const apiUrl = `http://localhost:3011/api/filterdata?${queryParams}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setFilteredData(data.data)
      console.log('Filtered Data:--++', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
    handleFilterSubmit()
  },[])

  // Handle topics top
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(formData).toString();
        console.log('queryParams', queryParams);
        const apiUrl = `http://localhost:3011/api/filterdata?topics=${topicSelect}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Filtered Data topicSelect================:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData(); 
  
  }, [topicSelect]);


  useEffect(() => {
    axios
      .get('http://localhost:3011/api/toptrendingtopics')
      .then((response) => {
        setTopTrendingTopics(response.data);
        console.log('response.data', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // axios
    //   .get(`http://localhost:3011/api/filterdata?topics=market`)
    //   .then((response) => {
    //     setSelectTopic(response.data.data);
    //     console.log('response.data---------------=============', response.data.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
  }, []);

  {
    /*Start to get  all topics , sector, region , country   */
  }
  const getTopicsApi = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3011/api/getUniqueTopics'
      );
      setTopics(response.data.topics);
      console.log('response.data-topics', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getSectorApi = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3011/api/getUniqueSectors'
      );
      setSectors(response.data.sectors);
      console.log('response.data-topics', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getRegionApi = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3011/api/getUniqueRegions'
      );
      setRegions(response.data.regions);
      console.log('response.data-topics', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCountryApi = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3011/api/getUniqueCountry'
      );
      setCountry(response.data.country);
      console.log('response.data-topics', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCityApi = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3011/api/getUniqueCity'
      );
      setCity(response.data.city);
      console.log('response.data-topics', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getSourceApi = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3011/api/getUniqueSource'
      );
      setSource(response.data.source);
      console.log('response.data-topics', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getPestleApi = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3011/api/getUniquePestle'
      );
      setPestle(response.data.pestle);
      console.log('response.data-topics', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // axios.get('http://localhost:3011/api/getUniqueTopics')
    //   .then(response => {
    //     setTopics(response.data.topics);
    //     console.log("response.data-topics",response.data)
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //   });
    getTopicsApi();
    getSectorApi();
    getRegionApi();
    getCountryApi();
    getCityApi();
    getPestleApi();
    getSourceApi();
  }, []);

  {
    /*End  to get  all topics , sector, region , country   */
  }

  //console.log every time then form data changes
  useEffect(() => {
    console.log('formdata', formData);
  }, [formData]);
  useEffect(() => {
    console.log('selecttopic888888888888888888888888888888', topicSelect);
  }, [topicSelect]);
  //select topic

  // const handleTopicSelect = (selectedTopic) => {
  //   setFormData({ ...formData, topics: selectedTopic });

  // };

  // const filteredTopics = getTopics?.filter(
  //   (topic) =>
  //     topic?.toLowerCase().includes(formData.topics.toLowerCase())
  // );

  // Generate an array of years (from 1900 to current year)
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }
  return (
    <div>
      <Container fluid="md  py-5">
        {/* <TopTrendingTopicsChart data={topTrendingTopics} /> */}
        {/* <TrendingTopicsChart/> */}
        {/* <ChartComponent data={topTrendingTopics} /> */}
        {/* <Row>
          <Col md={6} sm={12}>
            {topTrendingTopics.length > 0 ? (
              <BarChart data={topTrendingTopics} />
            ) : (
              ''
            )}
          </Col>

          <Col md={6} sm={12}>
                  <Col lg={4} md={4} sm={10}>
            
           
              <Form >
              <Row>
              <Col  md={6} sm={10}>
              <Form.Group   controlId="topics" className="mb-3">
                <Form.Label>Topics</Form.Label>

                <Form.Select
                  name="topics"
                  value={topicSelect}
                  onChange={(e) => setSelectTopic(e.target.value)} 
                  aria-label="Default select example"
                >
                  <option value="">Select a topic</option>
                  {getTopics?.map((topic, index) => (
                   
                    <option key={index} value={topic}>
                     
                      {topic}
                    </option>
                   
                  ))}
                </Form.Select>
              </Form.Group>
              </Col>
              <Col  md={6} sm={10}>
            <Button
              variant="primary"
              onClick={handleFilterSubmit}
              className="mx-auto w-auto my-4 "
              md={6}
            >
              Filter
            </Button>
            </Col>
            </Row>
              </Form>
              
            </Col>
           
          {topicSelect.length > 0 ?   <PolarChart topicsData={topicSelect}/> :"" }
      
          </Col>
        </Row> */}

        <Form className="py-5">
          {/* Start Year */}
          <Row>
            <Col lg={4} md={4} sm={12}>
              <Form.Group controlId="startYear" className="mb-3">
                <Form.Label>Start Year</Form.Label>
                {/* <Form.Control
        type="text"
        placeholder="Enter start year"
        name="startYear"
        value={formData.startYear}
        onChange={handleInputChange}
      /> */}
                <Form.Control
                  as="select"
                  name="startYear"
                  value={formData.startYear}
                  onChange={handleInputChange}
                >
                  <option value="">Select start year</option>
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            {/* End Year */}
            <Col lg={4} md={4} sm={12}>
              <Form.Group controlId="endYear" className="mb-3">
                <Form.Label>End Year</Form.Label>
                {/* <Form.Control
        type="text"
        placeholder="Enter end year"
        name="endYear"
        value={formData.endYear}
        onChange={handleInputChange}
      /> */}

                <Form.Control
                  as="select"
                  name="endYear"
                  value={formData.endYear}
                  onChange={handleInputChange}
                >
                  <option value="">Select End year</option>
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              {/* Topics */}
              <Form.Group controlId="topics" className="mb-3">
                <Form.Label>Topics</Form.Label>
                {/* <Form.Control
        type="text"
        placeholder="Enter topics (comma-separated)"
        name="topics"
        value={formData.topics}
        onChange={handleInputChange}
      /> */}
                <Form.Select
                  name="topics"
                  value={formData.topics}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                >
                  <option value="">Select a topic</option>
                  {getTopics?.map((topic, index) => (
                    // <li key={index} onClick={() => handleTopicSelect(topic)}>
                    <option key={index} value={topic}>
                      {' '}
                      {topic}
                    </option>
                    // </li>
                  ))}
                </Form.Select>

                {/* <Form.Select
        name="topics"
        value={formData.topics}
        onChange={handleInputChange}
        aria-label="Topics select"
      >
        <option value="">Select a topic</option>
        {filteredTopics?.map((topic, index) => (
          <option key={index} value={topic} onClick={() => handleTopicSelect(topic)}>
            {topic}
          </option>
        ))}
      </Form.Select>  */}
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              {/* Sector */}
              <Form.Group controlId="sector" className="mb-3">
                <Form.Label>Sector</Form.Label>
                {/* <Form.Control
        type="text"
        placeholder="Enter sector"
        name="sector"
        value={formData.sector}
        onChange={handleInputChange}
      /> */}
                <Form.Select
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                >
                  <option value="">Select a Sector</option>
                  {getSectors?.map((sector, index) => (
                    // <li key={index} onClick={() => handleTopicSelect(topic)}>
                    <option key={index} value={sector}>
                      {' '}
                      {sector}
                    </option>
                    // </li>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              {/* Region */}
              <Form.Group controlId="region" className="mb-3">
                <Form.Label>Region</Form.Label>
                {/* <Form.Control
        type="text"
        placeholder="Enter region"
        name="region"
        value={formData.region}
        onChange={handleInputChange}
      /> */}

                <Form.Select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                >
                  <option value="">Select a Region</option>
                  {getRegions?.map((region, index) => (
                    // <li key={index} onClick={() => handleTopicSelect(topic)}>
                    <option key={index} value={region}>
                      {' '}
                      {region}
                    </option>
                    // </li>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              {/* Pestle */}
              <Form.Group controlId="pestle" className="mb-3">
                <Form.Label>Pestle</Form.Label>
                {/* <Form.Control
        type="text"
        placeholder="Enter pestle"
        name="pestle"
        value={formData.pestle}
        onChange={handleInputChange}
      /> */}
                <Form.Select
                  name="pestle"
                  value={formData.pestle}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                >
                  <option value="">Select a Source</option>
                  {getPestle?.map((pestle, index) => (
                    // <li key={index} onClick={() => handleTopicSelect(topic)}>
                    <option key={index} value={pestle}>
                      {' '}
                      {pestle}
                    </option>
                    // </li>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              {/* Source */}
              <Form.Group controlId="source" className="mb-3">
                <Form.Label>Source</Form.Label>
                {/* <Form.Control
        type="text"
        placeholder="Enter source"
        name="source"
        value={formData.source}
        onChange={handleInputChange}
      /> */}
                <Form.Select
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                >
                  <option value="">Select a Source</option>
                  {getSource?.map((source, index) => (
                    // <li key={index} onClick={() => handleTopicSelect(topic)}>
                    <option key={index} value={source}>
                      {' '}
                      {source}
                    </option>
                    // </li>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              {/* Country */}
              <Form.Group controlId="country" className="mb-3">
                <Form.Label>Country</Form.Label>
                {/* <Form.Control
        type="text"
        placeholder="Enter country"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
      /> */}

                <Form.Select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                >
                  <option value="">Select a Country</option>
                  {getCountry?.map((country, index) => (
                    // <li key={index} onClick={() => handleTopicSelect(topic)}>
                    <option key={index} value={country}>
                      {' '}
                      {country}
                    </option>
                    // </li>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              {/* City */}
              <Form.Group controlId="city" className="mb-3">
                <Form.Label>City</Form.Label>
                {/* <Form.Control
        type="text"
        placeholder="Enter city"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
      /> */}

                <Form.Select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                >
                  <option value="">Select a City</option>
                  {getCity?.map((city, index) => (
                    // <li key={index} onClick={() => handleTopicSelect(topic)}>
                    <option key={index} value={city}>
                      {' '}
                      {city}
                    </option>
                    // </li>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Button
              variant="primary"
              onClick={handleFilterSubmit}
              className="mx-auto w-auto my-4"
            >
              Filter
            </Button>
          </Row>
        </Form>


        <Row>
          <Col md={6} sm={12}>
            {topTrendingTopics.length > 0 ? (
              <BarChart data={filteredData} />
            ) : (
              ''
            )}
          </Col>

          <Col md={6} sm={12}>
          {topicSelect.length > 0 ?   <PolarChart topicsData={filteredData}/> :"" }
      
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default App;
