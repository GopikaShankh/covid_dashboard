import "./About.css";

/**
 * About component provides information about the COVID-19 Dashboard application,
 * including its purpose, mission, and key features.
 */
const About = () => {
  return (
    <div className="about-container" role="main" aria-labelledby="about-title">
      {/* Main title of the About page */}
      <h2 className="about-title" id="about-title">About Us</h2>

      <div className="about-content">
        {/* Introduction to the dashboard */}
        <p className="about-description">
          Welcome to the <strong>COVID-19 Dashboard!</strong> This dashboard provides real-time data visualization
          for COVID-19 cases, recoveries, and deaths across the world. You can explore historical data
          of various countries through our interactive charts.
        </p>

        {/* Mission statement */}
        <p className="about-description">
          Our mission is to make global pandemic information accessible and easy to understand
          for everyone. Stay informed and stay safe!
        </p>

        {/* Mission section with heading and description */}
        <section className="mission-section" aria-labelledby="mission-title">
          <h3 className="mission-title" id="mission-title">Our Mission</h3>
          <p className="mission-description">
            We strive to deliver up-to-date information to help communities, health professionals, and governments 
            make informed decisions. Our interactive graphs and live updates ensure you stay current with the latest developments.
          </p>
        </section>

        {/* Features section with heading and list of features */}
        <section className="features-section" aria-labelledby="features-title">
          <h3 className="features-title" id="features-title">Features</h3>
          <ul className="features-list">
            <li>📈 Historical data visualization</li>
            <li>🔍 Country-specific insights</li>
            <li>💡 Easy-to-understand graphs and charts</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
