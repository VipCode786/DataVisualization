import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Form from 'react-bootstrap/Form';

const BarChart = ({data}) => {

    const[getData ,setData] = useState(null)
    console.log("labels-----",data)

    useEffect(() => {
      if (data && data?.length > 0) {
        const topics = data.map((item) => item.topic);
        const topicCount = topics.reduce((acc, curr) => {
          if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
          } else {
            acc[curr] += 1;
          }
          return acc;
        }, {});
  
        // Sort the topics by count and get the top 5
        const sortedTopics = Object.keys(topicCount).sort(
          (a, b) => topicCount[b] - topicCount[a]
        );
        const top5Topics = sortedTopics.slice(0, 5);
  
        const labels = top5Topics;
        const counts = top5Topics.map((topic) => topicCount[topic]);
  
        setData({
          labels: labels,
          datasets: [
            {
              label: 'Top Topics',
              data: counts,
              backgroundColor: [
                'rgba(75,192,192,1)',
                '#ecf0f1',
                '#50AF95',
                '#f3ba2f',
                '#2a71d0',
              ],
              borderWidth: 0,
            },
          ],
        });
      }
      else{
        setData(null)
      }
    }, [data]);

//     useEffect(()=>{
// if(data)
// {
//     const labels = data?.map((item) => item.topic);
//     const counts = data?.map((item) => item.count);
//     setData({
//         labels: labels,
//         datasets: [
//           {
//             label: "Top Topics",
//             data: counts,
//             backgroundColor: [
//               "rgba(75,192,192,1)",
//               "#ecf0f1",
//               "#50AF95",
//               "#f3ba2f",
//               "#2a71d0",
//             ],
//             // borderColor: "black",
//             borderWidth: 0,
//           },
//         ]
//     })
// }
//     },[data])


   
    // const [userData, setUserData] = useState({
    //     labels: data.map((data) => data._id),
    //     datasets: [
    //       {
    //         label: "Users Gained",
    //         data: data.map((data) => data.count),
    //         // backgroundColor: [
    //         //   "rgba(75,192,192,1)",
    //         //   "#ecf0f1",
    //         //   "#50AF95",
    //         //   "#f3ba2f",
    //         //   "#2a71d0",
    //         // ],
    //         // borderColor: "black",
    //         // borderWidth: 2,
    //       },
    //     ],
    //   });
  return (
    <>

    
   {getData ? <Bar  data={getData}   style={{height:"636px"}}/> : ""}
   {/* <Bar chartData={getData} /> */}
   </>
  )
}

export default BarChart