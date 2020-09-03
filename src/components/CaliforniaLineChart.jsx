import React from "react";
import { isEmpty } from "lodash";
import { Chart } from "chart.js";

const colors = ["#e84a5f", "#ff847c", "#feceab", "#99b898", "#66bfbf"];

const CaliforniaLineChart = (props) => {
  const { data, months } = props;

  if (!isEmpty(data)) {
    let labelSet = new Set();
    let dataset = [];
    for (let i = 20; i < 25; i++) {
      let dataRow = {
        label: "",
        backgroundColor: colors[i % 20],
        borderColor: colors[i % 20],
        fill: false,
        data: [],
      };
      let d = data[i];
      let bedroom_size = d.Bedroom_Size;
      dataRow.label = bedroom_size;
      for (const key in d) {
        if (key.includes("P")) {
          let parse = key.split("_");
          let month = months[parseInt(parse[2]) - 1];
          let year = parse[1];
          let label = `${month}, ${year}`;
          labelSet.add(label);

          let value = parseInt(d[key]);
          dataRow.data.push(value);
        }
      }
      dataset.push(dataRow);
    }

    const chartData = {
      type: "line",
      data: {
        labels: Array.from(labelSet),
        datasets: dataset,
      },
      options: {
        title: {
          fontSize: 36,
          display: true,
          text: "Rent in California",
        },
      },
    };

    const ctx = document.getElementById("CaliforniaLineChart").getContext("2d");
    const myLineChart = new Chart(ctx, chartData);
  }

  return (
    <div>
      <canvas id="CaliforniaLineChart"></canvas>
    </div>
  );
};

export default CaliforniaLineChart;
