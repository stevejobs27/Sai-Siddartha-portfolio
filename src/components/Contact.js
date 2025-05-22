import React, { useState } from "react";
import FadeInSection from "./FadeInSection";
import "../styles/Contact.css";

export default function Contact() {
  const [message, setMessage] = useState("");
  const yourEmail = "rafsanahmed2828@email.com";
  const handleSend = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${yourEmail}?subject=Contact from Portfolio&body=${encodeURIComponent(message)}`;
  };

return (
<div id="contact" >
    <FadeInSection>
        <div className="section-header">
            <span className="section-title">Get In Touch</span>
        </div>
        <form className="contact-form" onSubmit={handleSend}>
            <textarea
                className="contact-textarea"
                placeholder="Type your message here..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={6}
                required
                />
            <div className="contact-actions">
            <button className="contact-send-btn" type="submit">
                Send Email
            </button>
            </div>
        <div className="contact-rectangle">
            <p>Or email me directly at:</p>
            <a href={`mailto:${yourEmail}`} className="contact-email">{yourEmail}</a>
        </div>
        </form>   
        <div className="footer">
          <strong>Note:</strong> This site uses Google Analytics. No personal data is collected.
        </div>
    </FadeInSection>
</div>
  );
}