// import React, { useEffect, useRef } from 'react';
// import {Chart} from 'chart.js/auto';

// const TopTrendingTopicsChart = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef && chartRef.current) {
//       const ctx = chartRef.current.getContext('2d');

//       new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: data.map(item => item._id),
//           datasets: [{
//             label: 'Trending Topics',
//             data: data.map(item => item.count),
//             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1,
//           }],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             y: {
//               beginAtZero: true,
//               ticks: {
//                 stepSize: 50, // Adjust as needed
//               },
//             },
//           },
//         },
//       });
//     }
//   }, [data]);

//   return (
//     <div>
//       <h2>Top Trending Topics Chart</h2>
//       <canvas ref={chartRef} width={400} height={300} />
//     </div>
//   );
// };

// export default TopTrendingTopicsChart;

