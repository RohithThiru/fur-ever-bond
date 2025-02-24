import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import "./Breedpage.css";
import dogBreeds from "./dogBreeds";

const DogsPage = () => {
  const history = useHistory();

  const handleBreedClick = (breedName) => {
    history.push(`/pet/${breedName}`); // Redirect with breed name
  };

  return (
    <>
      <Navbar />
      <div className="breed-container">
        <h1 className="page-title">🐶 Dog Breeds</h1>
        <div className="breed-grid">
          {dogBreeds.map((breed, index) => (
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

export default DogsPage;
