import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pets.css";
import Navbar from "./Navbar";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    petType: "",
    gender: "",
    vaccination: "",
    location: "",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pets-for-sale");
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredPets = pets.filter((pet) => {
    return (
      (filters.petType === "" || pet.pet_type === filters.petType) ||
      (filters.gender === "" || pet.gender === filters.gender) ||
      (filters.vaccination === "" || pet.vaccination_status === filters.vaccination) ||
      (filters.location === "" || pet.location === filters.location)
    );
  });

  return (
    <>
      <Navbar />
      <div className="main-container">
        {/* Sidebar for filters */}
        <div className="sidebar">
          <h3>Filter Pets</h3>
          
          <label>Pet Type:</label>
          <select name="petType" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>

          <label>Gender:</label>
          <select name="gender" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Vaccination:</label>
          <select name="vaccination" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Fully Vaccinated">Fully Vaccinated</option>
            <option value="Partially Vaccinated">Partially Vaccinated</option>
            <option value="Not Vaccinated">Not Vaccinated</option>
          </select>

          <label>Location:</label>
          <select name="location" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="chennai">Chennai</option>
            <option value="coimbatore">Coimbatore</option>
            <option value="madurai">Madurai</option>
            <option value="dindugul">Dindugul</option>
            <option value="bangalore">Bangalore</option>
            <option value="hyderabad">Hyderabad</option>
          </select>
        </div>

        {/* Pets Display Section */}
        <div className="pets-container">
          <h2>Find Your Perfect Pet Companion 🐶🐾</h2>
          <div className="pets-grid">
            {filteredPets.length === 0 ? (
              <p>No pets available matching the filters.</p>
            ) : (
              filteredPets.map((pet) => (
                <div key={pet.id} className="pet-card">
                  <img src={`http://localhost:5000/uploads/${pet.image}`} alt={pet.pet_name} />
                  <div className="pet-details">
                    <h3>{pet.pet_name}</h3>
                    <p><strong>Type:</strong> {pet.pet_type}</p>
                    <p><strong>Breed:</strong> {pet.breed}</p>
                    <p><strong>Age:</strong> {pet.age}</p>
                    <p><strong>Gender:</strong> {pet.gender}</p>
                    <p><strong>Vaccination:</strong> {pet.vaccination_status}</p>
                    <p><strong>Location:</strong> {pet.location}</p>
                    <p><strong>Price:</strong> ${pet.price}</p>
                    <p className="description">{pet.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pets;
