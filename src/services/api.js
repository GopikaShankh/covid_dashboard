import axios from 'axios';

/**
 * Fetches the list of all countries from the REST Countries API.
 * @returns {Promise<Array>} An array of country data objects.
 */
export const getCountryList = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching country list:', error);
    throw error; // Re-throw so calling code can handle it if needed
  }
};

/**
 * Fetches historical COVID-19 data for a given country.
 * @param {string} country - The country name or code to fetch data for.
 * @returns {Promise<Object>} Historical COVID-19 data for the specified country.
 */
export const getHistoricalData = async (country) => {
  try {
    const url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=1500`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching historical data for ${country}:`, error);
    throw error; // Propagate the error to be handled upstream
  }
};
