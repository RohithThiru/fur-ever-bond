import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import "./Breedpage.css";
import catBreeds from "./catBreeds";

const CatsPage = () => {
  const history = useHistory();

  const handleBreedClick = (breedName) => {
    history.push(`/pet/${breedName}`); // Redirect with breed name
  };

  return (
    <>
      <Navbar />
      <div className="breed-container">
        <h1 className="page-title">🐱 Cat Breeds</h1>
        <div className="breed-grid">
          {catBreeds.map((breed, index) => (
            <div
              key={index}
              className="breed-card"
              onClick={() => handleBreedClick(breed.name)}
              style={{ cursor: "pointer" }}
            >
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

export default CatsPage;
