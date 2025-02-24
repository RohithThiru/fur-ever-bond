import React from "react";
import Navbar from "./Navbar";
import "./Breedpage.css";
import dogBreeds from "./dogBreeds";

const DogsPage = () => {
  return (
    <>
      <Navbar />
      <div className="breed-container">
        <h1 className="page-title">🐶 Dog Breeds</h1>
        <div className="breed-grid">
          {dogBreeds.map((breed, index) => (
            <div key={index} className="breed-card">
              <img src={breed.image} alt={breed.name} className="breed-image" />
              <h2 className="breed-name">{breed.name}</h2>
              <p className="breed-description">{breed.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DogsPage;
