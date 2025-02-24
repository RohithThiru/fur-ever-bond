import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./PetsPage.css";

const PetsPage = () => {
  const { breedName } = useParams(); // Get breed name from URL
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pets based on breed
    axios
      .get(`http://localhost:5000/api/pets/${breedName}`)
      .then((response) => {
        setPets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
        setLoading(false);
      });
  }, [breedName]);

  return (
    <>
      <Navbar />
      <div className="pets-container">
        <h1 className="page-title">Available {breedName}</h1>

        {loading ? (
          <p>Loading...</p>
        ) : pets.length > 0 ? (
          <div className="pets-grid">
            {pets.map((pet) => (
              <div key={pet.pet_id} className="pet-card">
                <img
  src={`http://localhost:5000/uploads/${pet.image}`}
  alt={pet.pet_name}
  className="pet-image"
  onError={(e) => {
    console.log("Image failed to load:", `http://localhost:5000/uploads/${pet.image}`);
    e.target.src = "/default-image.jpg"; // Fallback image
  }}
/>

                <h2 className="pet-name">{pet.pet_name}</h2>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Vaccination:</strong> {pet.vaccination_status}</p>
                <p><strong>Location:</strong> {pet.location}</p>
                <p><strong>Price:</strong> ${pet.price}</p>
                <p><strong>Owner:</strong> {pet.owner_name}</p>
                <p><strong>Contact:</strong> {pet.phone}</p>
                <p className="pet-description">{pet.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No {breedName} breed cats available.</p>
        )}
      </div>
    </>
  );
};

export default PetsPage;
