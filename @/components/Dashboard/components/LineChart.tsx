"use client";

type LineType = {
  data?: object[];
  loading?: boolean;
};

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC<LineType> = ({ data, loading }) => {
  interface Row {
    date: string;
    value: number;
  }
  function formatAngka(angka: any) {
    return angka.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#FFF",
        usePointStyle: true,
        titleColor: "#000",

        callbacks: {
          // To change title in tooltip
          title: (data: any) => {
            return "Pendapatan";
          },
          label: function (context: any) {
            let label = context.dataset.label || "";

            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return formatAngka(label);
          },
          // To change label in tooltip
          // label: (data: any) => {
          //   return data.parsed.y;
          // },
          // labelPointStyle: function (context: any) {
          //   return {
          //     pointStyle: "none",
          //   };
          // },

          labelTextColor: function (context: any) {
            return "#000";
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 4,
  };

  const dataSource = {
    labels: (data as Row[])?.map((row) => moment(row?.date).format("MMM")),
    datasets: [
      {
        data: (data as Row[])?.map((row) => row?.value),
        borderColor: "#00CACD",
        backgroundColor: "#00CACD",
      },
    ],
  };

  return <Line options={options} data={dataSource} />;
};

export default LineChart;
