function Contact() {
  return (
    <div className="contact-page">

      {/* Heading */}
      <h1 className="contact-heading">
        Contact Us ☎
      </h1>

      {/* Main Contact Section */}
      <div className="contact-container">

        {/* Left Side */}
        <div className="contact-info">

          <p className="small-title">KEEP CLOSE</p>

          <h2>Get In Touch</h2>

          <p className="contact-para">
            We'd love to hear from you. Visit our cafe or send us your
            questions anytime.
          </p>

          <div className="info-box">
            <p>📍 Lahore, Pakistan</p>
            <p>📞 +92 300 XXXXXXX</p>
          </div>

          <div className="info-box">
            <p>📧 brewhaven@gmail.com</p>
            <p>⏰ Open 8AM - 11PM</p>
          </div>

        </div>

        {/* Right Side */}
        <div className="contact-form">

          <h2>Your Details</h2>

          <form>

            <div className="input-row">

              <input
                type="text"
                placeholder="Your Name"
              />

              <input
                type="email"
                placeholder="Email Address"
              />

            </div>

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              placeholder="Your Message"
            ></textarea>

            <button type="submit">
              CONTACT US
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;