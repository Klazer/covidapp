import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import Button from "react-bootstrap/Button";

const Chart = ({
  data: { confirmed, deaths, recovered, dailydeaths, dailyinfected },
  country,
  handleCurrentChange,
}) => {
  const [dailyData, setDailyData] = useState([]);
  var isCurrent = Boolean(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []); //Array makes useEffect happen only once

  const lineChart = dailyData[0] ? ( //Checks to make sure chart is not empty
    <Line
      data={{
        labels: dailyData.map(({ date }) => date), //This maps each date that data is recorded
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "blue",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
      options={{
        title: { display: true, text: `COVID-19 Data WorldWide` },
      }}
    />
  ) : null; //If dailydata is available, return line chart

  const dailyGlobalChart = dailyData[0] ? ( //Checks to make sure chart is not empty
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map((data) => data.dailyinfected),
            label: "Infected",
            borderColor: "blue",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.dailydeaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
      options={{
        title: { display: true, text: `Daily COVID-19 Data WorldWide` },
      }}
    />
  ) : null; //If dailydata is available, return line chart

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["blue", "#0ed64a", "#f00707"],
            data: [confirmed.value, recovered.value, deaths.value], //Data is being passed from line 7
          },
        ],
      }}
      options={{
        legend: { display: false }, //Don't display a legend
        title: { display: true, text: `COVID-19 Data for ${country}` }, //display title
      }}
    />
  ) : null; //If data exists, create bar chart otherwise return null

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  ); //If a country is chosen, display a bar chart otherwise display a line chart
};

export default Chart;
