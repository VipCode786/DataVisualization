import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy the previous chart instance
      }

      const labels = data.map(item => item._id);
      const counts = data.map(item => item.count);

      const ctx = chartContainer.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Counts',
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count'
              }
            },
            x: {
              title: {
                display: true,
                text: '_id'
              }
            }
          }
        }
      });
    }
  }, [data]);

  return (
    <div>
      <canvas ref={chartContainer} width="400" height="400"></canvas>
    </div>
  );
};

export default ChartComponent;
