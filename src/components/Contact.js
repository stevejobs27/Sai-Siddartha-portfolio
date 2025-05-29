import React, { useState, useRef } from "react";
import FadeInSection from "./FadeInSection";
import Icon from "./Icons";
import "../styles/Contact.css";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const yourEmail = "rafsanahmed2828@email.com";

  // Handle form submission
  const handleSend = (e) => {
    e.preventDefault();
    
    // Hide form and show success message
    formRef.current.style.display = 'none';
    successRef.current.style.display = 'flex';
    
    setIsSubmitted(true);
    
    // Send the email
    setTimeout(() => {
      window.location.href = `mailto:${yourEmail}?subject=Contact from ${name}&body=${encodeURIComponent(message)}`;
    }, 1000);
  };

  return (
    <div id="contact" className="contact-section">
      <FadeInSection>
        <div className="section-header">
          <span className="section-title">Get In Touch</span>
        </div>
        <div className="contact-container">
          <div className="contact-bg-elements">
            <div className="contact-circle"></div>
            <div className="contact-square"></div>
          </div>
          
          <form className="contact-form" onSubmit={handleSend} ref={formRef}>
            <div className="form-group">
              <input
                type="text"
                className="contact-input"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <Icon name="User" className="input-icon" />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                className="contact-input"
                placeholder="Your Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Icon name="Mail" className="input-icon" />
            </div>
            
            <div className="form-group">
              <textarea
                className="contact-textarea"
                placeholder="Your Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={6}
                required
              />
              <Icon name="MessageSquare" className="input-icon textarea-icon" />
            </div>
            
            <div className="contact-actions">
              <button 
                className="contact-send-btn" 
                type="submit"
              >
                Send Message
                <Icon name="Send" className="btn-icon" />
              </button>
            </div>
            
            <div className="contact-info">
              <div className="contact-info-item">
                <Icon name="Mail" className="contact-info-icon" />
                <a href={`mailto:${yourEmail}`} className="contact-email">
                  {yourEmail}
                </a>
              </div>
            </div>
          </form>
          
          <div className="success-message" ref={successRef} style={{ display: 'none' }}>
            <Icon name="CheckCircle" className="success-icon" />
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
            <button 
              className="reset-btn"
              onClick={() => window.location.reload()}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}