import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllData.css';

/**
 * AllData component fetches and displays historical COVID-19 data
 * for selected countries with loading and error handling.
 */
const AllData = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('US');

  // Fetch list of all countries on component mount
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

        // Default to US if available, else first country
        const hasUS = countryList.find(c => c.code === 'US');
        if (hasUS) {
          setCountry('US');
        } else if (countryList.length > 0) {
          setCountry(countryList[0].code);
        }
      } catch {
        setError('Failed to fetch country list.');
      }
    };

    fetchCountries();
  }, []);

  // Fetch historical COVID-19 data when country changes
  useEffect(() => {
    if (!country) return;

    const fetchHistoricalData = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(
          `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`
        );

        const timeline = res.data.timeline;
        // Format data into array of {date, cases, deaths, recovered}
        const formattedData = Object.keys(timeline.cases).map(date => ({
          date,
          cases: timeline.cases[date],
          deaths: timeline.deaths[date],
          recovered: timeline.recovered[date],
        }));

        setHistoricalData(formattedData);
      } catch {
        setError('Failed to fetch historical data.');
        setHistoricalData([]);
      }
      setLoading(false);
    };

    fetchHistoricalData();
  }, [country]);

  return (
    <main className="all-data-container" aria-live="polite">
      <h2 className="all-data-title">COVID-19 Daily Data</h2>

      {/* Country selection */}
      <div className="country-select-wrapper">
        <label htmlFor="country-select">Select Country:</label>
        <select
          id="country-select"
          value={country}
          onChange={e => setCountry(e.target.value)}
          aria-label="Select country for COVID-19 data"
          className="country-select"
        >
          {countries.map(c => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading and error states */}
      {loading && <p className="loading-text">Loading data...</p>}
      {error && <p role="alert" className="error-text">{error}</p>}

      {/* Data table */}
      {!loading && historicalData.length > 0 && (
        <div className="table-wrapper" tabIndex={0} aria-label={`Historical COVID-19 data for ${country}`}>
          <table className="data-table" role="table" aria-describedby="table-desc">
            <caption id="table-desc">Daily COVID-19 cases, recovered, and deaths for selected country.</caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Cases</th>
                <th scope="col">Recovered</th>
                <th scope="col">Deaths</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map(({ date, cases, recovered, deaths }, index) => (
                <tr key={index}>
                  <td>{date}</td>
                  <td>{cases.toLocaleString()}</td>
                  <td>{recovered.toLocaleString()}</td>
                  <td>{deaths.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No data message */}
      {!loading && historicalData.length === 0 && !error && (
        <p className="no-data-text">No data available for this country.</p>
      )}
    </main>
  );
};

export default AllData;
