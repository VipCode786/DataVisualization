import React, { useEffect, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';

const PolarChart = ({ topicsData }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (topicsData && topicsData?.length > 0) {
      let relevanceSum = 0;
      let intensitySum = 0;
      let likelihoodSum = 0;

      // Calculate sums
      topicsData?.forEach((item) => {
        relevanceSum += item.relevance || 0;
        intensitySum += item.intensity || 0;
        likelihoodSum += item.likelihood || 0;
      });

      // Set the data for the chart
      setData({
        labels: ['Relevance', 'Intensity', 'Likelihood'],
        datasets: [
          {
            label: 'Aggregated Data',
            data: [relevanceSum, intensitySum, likelihoodSum],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    }

    else{
      setData(null)
    }
  }, [topicsData]);

  return (
    <div>
      {/* <h2>{topicsData[0].topic}</h2> */}
      {data && <PolarArea data={data} />} {/* Render the chart only when data is available */}
    </div>
  );
};

export default PolarChart;
