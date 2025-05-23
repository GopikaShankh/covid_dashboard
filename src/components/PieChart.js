import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

/**
 * PieChart component to display COVID-19 data distribution
 * @param {number} cases - Number of COVID-19 cases
 * @param {number} recovered - Number of recovered cases
 * @param {number} deaths - Number of deaths
 */
const PieChart = ({ cases, recovered, deaths }) => {
  
  /**
   * Prepare the data object for the Pie chart
   */
  const getChartData = () => ({
    labels: ['Cases', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: 'COVID-19 Distribution',
        data: [cases, recovered, deaths],
        backgroundColor: ['#f39c12', '#27ae60', '#c0392b'], // Orange, Green, Red
        borderColor: '#fff',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  });

  /**
   * Configuration options for the Pie chart
   */
  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 15,
          padding: 15,
          color: '#333',
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div
      style={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: 'auto',
      }}
    >
      {/* Render Pie chart with prepared data and options */}
      <Pie data={getChartData()} options={chartOptions} />
    </div>
  );
};

export default PieChart;
