import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const TrendingTopicsChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3011/api/toptrendingtopics');
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          const labels = data.map(item => item._id);
          const counts = data.map(item => item.count);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Count',
                data: counts,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error('Data format is incorrect or empty.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Top Trending Topics</h2>

      <div style={{ height: '400px', width: '600px' }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Count',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Topics',
                },
              },
            },
          }}
        />
      </div> 
    </div>
  );
};

export default TrendingTopicsChart;
