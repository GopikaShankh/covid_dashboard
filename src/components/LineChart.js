import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

/**
 * LineChart Component
 * This component renders a line chart using react-chartjs-2 and displays
 * the total COVID-19 cases over time.
 * 
 * Props:
 * - data (Object): An object containing date-wise total cases.
 *   Example:
 *   {
 *     "2023-01-01": 5000,
 *     "2023-01-02": 5200,
 *     ...
 *   }
 */

const LineChart = ({ data }) => {
  // Prepare chart data structure for Chart.js
  const chartData = {
    labels: Object.keys(data), // Dates for the X-axis
    datasets: [
      {
        label: 'Total Cases',     // Label for the dataset
        data: Object.values(data), // Values for the Y-axis
        fill: false,               // Disable area fill under the line
        borderColor: '#f39c12',    // Line color
      },
    ],
  };

  return (
    <div style={{ margin: '20px' }}>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
