import React from "react";
import "./About.css";
import Navbar from "./Navbar";
const About = () => {
  return (
    <>
    <Navbar />
    <div className="about-container">
      <div className="about-header">About FurEver Bond🐾</div>
      
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>FurEver Bond🐾 is dedicated to creating a loving and responsible pet adoption community. We help pet lovers find their perfect companions while ensuring the safety and well-being of every animal.</p>
      </div>
      
      <div className="about-section">
        <h2>What We Offer</h2>
        <p>We provide a trusted platform for pet adoption, responsible pet rehoming, and a vibrant blog where pet enthusiasts can share stories, tips, and experiences.</p>
      </div>
      
      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <p>✔ Trusted pet listings <br /> ✔ Engaging pet community <br /> ✔ Verified pet adoption process <br /> ✔ Informative blogs for pet care</p>
      </div>

      <div className="about-footer">
        <p>Have questions? <a href="/contact">Contact Us</a></p>
      </div>
    </div>
    </>
  );
};

export default About;
