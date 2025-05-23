import React from "react";
import "./Profile.css";

/**
 * Profile component displays user's basic info, skills, and education
 */
const Profile = () => {
  return (
    <div className="profile-container">
      {/* Title Section */}
      <h2 className="profile-title">My Profile</h2>

      {/* Basic Information Section */}
      <section className="profile-section" aria-label="Basic Information">
        <h3>Basic Information</h3>
        <p>
          <strong>Name:</strong> Gopika Shankh
        </p>
        <p>
          <strong>Role:</strong> React Developer
        </p>
        <p>
          <strong>Email:</strong> gopika.shankh@example.com
        </p>
        <p>
          <strong>Location:</strong> India
        </p>
      </section>

      {/* Skills Section */}
      <section className="profile-section" aria-label="Skills">
        <h3>Skills</h3>
        <ul>
          <li>React.js</li>
          <li>JavaScript (ES6+)</li>
          <li>HTML & CSS</li>
          <li>Responsive Design</li>
          <li>API Integration</li>
          <li>Git & GitHub</li>
        </ul>
      </section>

      {/* Education Section */}
      <section className="profile-section" aria-label="Education">
        <h3>Education</h3>
        <p>Navgurukul Raipur (2023 - 2025)</p>
      </section>
    </div>
  );
};

export default Profile;
