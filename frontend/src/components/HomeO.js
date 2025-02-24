import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import "./HomeO.css";
import dogImage from "../assets/dogimage.svg";
import catImage from "../assets/catimage.avif";

const HomeO = () => {
  const history = useHistory();

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="hero-section">
          <h1 className="website-name">FurEver Bond 🐾</h1>
          <div className="image-container">
            <img 
              src={dogImage} 
              alt="Dog" 
              className="hero-image" 
              onClick={() => history.push("/dogs")} 
            />
            <img 
              src={catImage} 
              alt="Cat" 
              className="hero-image" 
              onClick={() => history.push("/cats")} 
            />
          </div>
          <p className="hero-text">Find your perfect furry companion today!</p>
        </div>
      </div>
    </>
  );
};

export default HomeO;
