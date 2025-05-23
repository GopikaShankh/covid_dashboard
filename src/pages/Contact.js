import "./Contact.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact-container" aria-label="Contact us section">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-content">
        {/* Contact Information */}
        <article className="contact-info" aria-labelledby="contact-info-title">
          <h3 id="contact-info-title">Get in Touch</h3>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@covid19dashboard.com" className="contact-link">
                support@covid19dashboard.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:+1234567890" className="contact-link">
                +1 234 567 890
              </a>
            </li>
            <li>
              <strong>Address:</strong> 123 COVID-19 St, Global Health City
            </li>
          </ul>

          <h3>Follow Us</h3>
          <nav
            className="social-icons"
            aria-label="Social media links"
            role="navigation"
          >
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </nav>
        </article>

        {/* Contact Form */}
        <article className="contact-form" aria-labelledby="contact-form-title">
          <h3 id="contact-form-title">Send us a Message</h3>
          <form>
            <label htmlFor="name">Your Name</label>
            <input id="name" type="text" placeholder="Your Name" required />

            <label htmlFor="email">Your Email</label>
            <input id="email" type="email" placeholder="Your Email" required />

            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </article>
      </div>

      {/* Map Section */}
      <section className="map-section" aria-label="Location map">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093743!2d144.95373631532145!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577b2f9b5a4e64a!2sGlobal%20Health%20City!5e0!3m2!1sen!2sin!4v1628755733981!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </section>
  );
};

export default Contact;
