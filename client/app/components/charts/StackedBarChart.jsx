"use client";

import React from "react";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const StackedBarChart = ({
  allLabels,
  noIssue,
  lateDelivery,
  complaint,
  both,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext("2d");
      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: allLabels,
          datasets: [
            {
              label: "No Issues",
              data: noIssue,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgb(255, 99, 132)"],
              borderWidth: 1,
              barThickness: 50,
            },
            {
              label: "Late Delivery",
              data: lateDelivery,
              backgroundColor: ["rgba(255, 159, 64, 0.2)"],
              borderColor: ["rgb(255, 159, 64)"],
              borderWidth: 1,
              barThickness: 50,
            },
            {
              label: "Complaint",
              data: complaint,
              backgroundColor: ["rgba(205, 205, 86, 0.2)"],
              borderColor: ["rgb(205, 205, 86)"],
              borderWidth: 1,
              barThickness: 50,
            },
            {
              label: "Late Delivery + Complaint",
              data: both,
              backgroundColor: ["rgba(75, 192, 192, 0.2)"],
              borderColor: ["rgb(75, 192, 192)"],
              borderWidth: 1,
              barThickness: 50,
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              min: 0,
              beginAtZero: true,
              stacked: true,
            },
          },
        },
      });

      chartRef.current.chart = newChart;
    }
  }, [allLabels, noIssue, lateDelivery, complaint, both]);

  return (
    <div className="overflow-x-auto">
      <canvas
        ref={chartRef}
        className="min-h-[60svh] w-[95%] min-w-[400px] max-w-[800px] mx-auto"
      />
    </div>
  );
};

export default StackedBarChart;

// responsive
