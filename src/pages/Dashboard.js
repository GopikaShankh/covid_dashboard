import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { format, parse } from 'date-fns';
import './Dashboard.css';

const COLORS = ['#007bff', '#28a745', '#dc3545'];

const StatCard = ({ title, value, color }) => (
  <div style={{
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
    flex: '1 1 200px',
    maxWidth: 250
  }}>
    <h4 style={{ color }}>{title}</h4>
    <p style={{ fontSize: 24, fontWeight: 'bold' }}>{value.toLocaleString()}</p>
  </div>
);

const Dashboard = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('US');
  const [debouncedCountry, setDebouncedCountry] = useState('US');
  const [historicalData, setHistoricalData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch countries once
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get('https://restcountries.com/v3.1/all');
        const countryList = res.data
          .filter(c => c.cca2)
          .map(c => ({
            name: c.name.common,
            code: c.cca2.toUpperCase(),
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
        const hasUS = countryList.find(c => c.code === 'US');
        if (hasUS) {
          setCountry('US');
          setDebouncedCountry('US');
        } else if (countryList.length > 0) {
          setCountry(countryList[0].code);
          setDebouncedCountry(countryList[0].code);
        }
      } catch {
        setError('Failed to fetch country list.');
      }
    };
    fetchCountries();
  }, []);

  // Debounce country selection
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCountry(country);
    }, 300);
    return () => clearTimeout(handler);
  }, [country]);

  // Fetch COVID data whenever debouncedCountry changes
  useEffect(() => {
    if (!debouncedCountry) return;

    const fetchCovidData = async (countryCode) => {
      setLoading(true);
      setError('');
      try {
        const histRes = await axios.get(
          `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=1500`
        );
        const summaryRes = await axios.get(
          `https://disease.sh/v3/covid-19/countries/${countryCode}`
        );

        const timeline = histRes.data.timeline;
        const formattedData = Object.keys(timeline.cases).map(dateStr => ({
          date: dateStr,
          cases: timeline.cases[dateStr],
          deaths: timeline.deaths[dateStr],
          recovered: timeline.recovered[dateStr],
        }));
        setHistoricalData(formattedData);

        setSummaryData(summaryRes.data);

      } catch {
        setError('Failed to fetch COVID-19 data.');
        setHistoricalData(null);
        setSummaryData(null);
      }
      setLoading(false);
    };

    fetchCovidData(debouncedCountry);
  }, [debouncedCountry]);

  // Use summaryData directly for total numbers (latest data)
  const pieData = summaryData ? [
    { name: 'Cases', value: summaryData.cases },
    { name: 'Recovered', value: summaryData.recovered },
    { name: 'Deaths', value: summaryData.deaths },
  ] : [];

  return (
      <div className="dashboard-container">
      <h1 style={{ textAlign: 'center' }}>COVID-19 Dashboard</h1>

      <div id="select-conuntry">
        <label htmlFor="country-select" >
          Select Country:
        </label>
        <select
          id="country-select"
          value={country}
          onChange={e => setCountry(e.target.value)}
        >
          {countries.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Loading data...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {!loading && !summaryData && !error && (
        <p style={{ textAlign: 'center' }}>No data available for the selected country.</p>
      )}

      {summaryData && !loading && (
        <>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <StatCard title="Total Cases" value={summaryData.cases} color="#007bff" />
            <StatCard title="Recovered" value={summaryData.recovered} color="#28a745" />
            <StatCard title="Deaths" value={summaryData.deaths} color="#dc3545" />
          </div>

          <p style={{ textAlign: 'center', marginTop: 10, color: '#555' }}>
            Last updated: {new Date(summaryData.updated).toLocaleString()}
          </p>
        </>
      )}

      {historicalData && !loading && (
        <div style={{ display: 'flex', marginTop: 40, gap: 50, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: '2 1 700px', height: 400 }}>
            <h3 style={{ textAlign: 'center' }}>Cases, Deaths & Recovered Over Time</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(dateStr) => format(parse(dateStr, 'M/d/yy', new Date()), 'MMM dd')}
                />
                <YAxis
                  tickFormatter={(value) =>
                    value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` :
                    value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value
                  }
                />
                <Tooltip
                  labelFormatter={(dateStr) =>
                    format(parse(dateStr, 'M/d/yy', new Date()), 'MMMM dd, yyyy')
                  }
                />
                <Line type="monotone" dataKey="cases" stroke="#007bff" dot={false} />
                <Line type="monotone" dataKey="recovered" stroke="#28a745" dot={false} />
                <Line type="monotone" dataKey="deaths" stroke="#dc3545" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ flex: '1 1 300px', height: 400 }}>
            <h3 style={{ textAlign: 'center' }}>Summary Pie Chart</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
