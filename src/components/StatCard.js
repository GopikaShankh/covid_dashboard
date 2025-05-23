import './StatCard.css';

/**
 * StatCard component displays a statistic with a title and count.
 * The border color can be customized via props.
 * 
 * @param {string} title - The title of the statistic (e.g., 'Cases', 'Recovered').
 * @param {number} count - The numerical value for the statistic.
 * @param {string} color - The border color for the card (CSS color string).
 */
const StatCard = ({ title, count, color }) => {
  return (
    <div
      className="stat-card"
      style={{ borderColor: color }} // Dynamic border color based on props
      role="region"
      aria-label={`${title} statistic`}
      tabIndex="0"
    >
      {/* Title of the statistic */}
      <h3>{title}</h3>

      {/* Number formatted with commas for readability */}
      <p>{count.toLocaleString()}</p>
    </div>
  );
};

export default StatCard;
