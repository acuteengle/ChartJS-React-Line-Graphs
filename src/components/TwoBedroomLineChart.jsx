import React from "react";
import { isEmpty } from "lodash";
import { Chart } from "chart.js";

const colors = [
  "#ffa372",
  "#ed6663",
  "#81b214",
  "#4e89ae",
  "#ffc93c",
  "#bfdcae",
  "#a2d5f2",
];

const states = {
  California: 22,
  "New York": 162,
  Texas: 217,
  Washington: 237,
  Illinois: 67,
  Colorado: 27,
  Maryland: 102,
};

const TwoBedroomLineChart = (props) => {
  const { data, months } = props;

  if (!isEmpty(data)) {
    let labelSet = new Set();
    let dataset = [];
    let propertIndex = 0;
    for (const s in states) {
      let index = states[s];
      let dataRow = {
        label: s,
        backgroundColor: colors[propertIndex % 8],
        borderColor: colors[propertIndex % 8],
        fill: false,
        data: [],
      };
      propertIndex++;
      let d = data[index];
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
          text: "2BR in Various States",
        },
      },
    };

    const ctx = document.getElementById("TwoBedroomLineChart").getContext("2d");
    const myLineChart = new Chart(ctx, chartData);
  }

  return (
    <div>
      <canvas id="TwoBedroomLineChart"></canvas>
    </div>
  );
};

export default TwoBedroomLineChart;
