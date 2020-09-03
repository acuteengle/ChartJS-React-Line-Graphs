import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Papa from "papaparse";
import ApartmentData from "../apartment_rent.csv";

import TwoBedroomLineChart from "./TwoBedroomLineChart";
import CaliforniaLineChart from "./CaliforniaLineChart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Charts = (props) => {
  const [data, setData] = useState({});

  const onComplete = (result) => {
    setData(result.data);
  };

  // https://github.com/Keyang/node-csvtojson/issues/285
  useEffect(() => {
    Papa.parse(ApartmentData, {
      download: true,
      header: true,
      delimiter: ",",
      newline: ",",
      complete: onComplete,
    });
  }, []);

  return (
    <div class="container" style={{ margin: "40px auto" }}>
      <CaliforniaLineChart data={data} months={months} />
      <TwoBedroomLineChart data={data} months={months} />
    </div>
  );
};

export default Charts;
