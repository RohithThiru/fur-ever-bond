import React from "react";
import Navbar from "./Navbar";
import "./HomeO.css";
import dogImage from "../assets/dogimage.svg";
const HomeO = () => {
  return (
    <>
    <Navbar />
    <div className="home-container">
      
      <div className="hero-section">
        <h1 className="website-name">FurEver Bond 🐾</h1>
        <img src={dogImage} alt="Pet Adoption" className="hero-image" />
        <p className="hero-text">Find your perfect furry companion today!</p>
      </div>
    </div>
    </>
  );
};

export default HomeO;
