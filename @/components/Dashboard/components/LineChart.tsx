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
import { Spin } from "antd";
import { formatAngka } from "@dsarea/@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Row {
  date: string;
  value: number;
}
const LineChart: React.FC<LineType> = ({ data, loading }) => {
  function formatNumber(angka: any) {
    return angka.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const garis = {
    id: "garis",
    afterDraw: (chart: any) => {
      if (chart.tooltip?._active?.length) {
        let x = chart.tooltip._active[0].element.x;
        let yAxis = chart.scales.y;
        let ctx = chart.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([5, 7]);
        ctx.moveTo(x, yAxis.top);
        ctx.lineTo(x, yAxis.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#7A7A7A";
        ctx.stroke();
        ctx.restore();
      }
    },
  };
  // const plugin = {
  //   id: "verticalLiner",
  //   afterInit: (chart, args, opts) => {
  //     chart.verticalLiner = {};
  //   },
  //   afterEvent: (chart, args, options) => {
  //     const { inChartArea } = args;
  //     chart.verticalLiner = { draw: inChartArea };
  //   },
  //   beforeTooltipDraw: (chart, args, options) => {
  //     const { draw } = chart.verticalLiner;
  //     if (!draw) return;

  //     const { ctx } = chart;
  //     const { top, bottom } = chart.chartArea;
  //     const { tooltip } = args;
  //     const x = tooltip?.caretX;
  //     if (!x) return;

  //     ctx.save();

  //     ctx.beginPath();
  //     ctx.moveTo(x, top);
  //     ctx.lineTo(x, bottom);
  //     ctx.stroke();

  //     ctx.restore();
  //   },
  // };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        // enabled: true,
        // backgroundColor: "#FFF",
        // usePointStyle: true,
        titleColor: "#7A7A7A",
        // titleFont: {
        //   // size: 100,
        //   weight: "normal",
        // },
        backgroundColor: "#FAFAFA",
        borderColor: "#7A7A7A",
        borderWidth: 1,
        titleFontColor: "black",
        titleFontStyle: "normal",
        displayColors: false,
        bodyFontColor: "black",

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
            return formatNumber(label);
          },
          // To change label in tooltip
          // label: (data: any) => {
          //   return data.parsed.y;
          // },
          // labelPointStyle: function (context: any) {
          //   return {
          //     pointStyle: false,
          //   };
          // },

          labelTextColor: function (context: any) {
            return "#000";
          },
        },
        // callbacks: {
        //   title: function (d) {
        //     return "aw";
        //   },
        //   label: function (d) {
        //     const label = "bale";
        //     const value = 10;
        //     const sign = value >= 0 ? "+" : "";
        //     return `${label}: ${sign}${value.toFixed(2)}%`;
        //   },
        // },
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
        // ticks: {
        //   callback: function (value) {
        //     return formatAngka(value);
        //   },
        // },
      },
    },
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 4,
    interaction: {
      // mode: "index",
      intersect: false,
    },
  };

  const dataSource = {
    labels: (data as Row[])?.map((row) => moment(row?.date).format("MMM")),
    datasets: [
      {
        data: (data as Row[])?.map((row) => row?.value),
        borderColor: "#00CACD",
        backgroundColor: "#00CACD",
        pointRadius: 0,
      },
    ],
  };

  return <Line options={options} plugins={[garis]} data={dataSource} />;
};

export default LineChart;
