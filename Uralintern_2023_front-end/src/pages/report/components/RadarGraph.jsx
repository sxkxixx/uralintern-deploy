import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function RadarGraph({legend,labels,values}) {
    
    //console.log(values)
    const datasets = [
        {
          label: legend,
          data: values,
          fill: false,
          backgroundColor: "rgb(245, 245, 245)",
          borderColor: "rgba(245, 124, 0, 1)",
          pointBackgroundColor: "rgba(245, 124, 0, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "rgb(245, 245, 245)",
          pointHoverBorderColor: "rgb(245, 245, 245)",
          hoverBackgroundColor: "rgb(245, 245, 245)"
        }
      ];

    const data = {labels, datasets};
    const chartOptions = {
      scale: {
          min: -1,
          max: 3,
      }  
    }

    return (
      <div>
        <Radar
        width={520}
        height={420}
        type='radar'
        options={chartOptions} data={data}/>
         </div>
    );
}

export default RadarGraph;