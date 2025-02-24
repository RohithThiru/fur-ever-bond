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
      (filters.petType === "" || pet.pet_type.toLowerCase() === filters.petType.toLowerCase()) &&
      (filters.gender === "" || pet.gender.toLowerCase() === filters.gender.toLowerCase()) &&
      (filters.vaccination === "" || pet.vaccination_status.toLowerCase() === filters.vaccination.toLowerCase()) &&
      (filters.location === "" || pet.location.toLowerCase() === filters.location.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="sidebar">
          <h3>Filter Pets</h3>
          <label>Pet Type:</label>
          <select name="petType" onChange={handleFilterChange} value={filters.petType}>
            <option value="">All</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <label>Gender:</label>
          <select name="gender" onChange={handleFilterChange} value={filters.gender}>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label>Vaccination:</label>
          <select name="vaccination" onChange={handleFilterChange} value={filters.vaccination}>
            <option value="">All</option>
            <option value="Fully Vaccinated">Fully Vaccinated</option>
            <option value="Partially Vaccinated">Partially Vaccinated</option>
            <option value="Not Vaccinated">Not Vaccinated</option>
          </select>
          <label>Location:</label>
          <select name="location" onChange={handleFilterChange} value={filters.location}>
            <option value="">All</option>
            <option value="chennai">Chennai</option>
            <option value="coimbatore">Coimbatore</option>
            <option value="madurai">Madurai</option>
            <option value="dindugul">Dindugul</option>
            <option value="bangalore">Bangalore</option>
            <option value="hyderabad">Hyderabad</option>
          </select>
        </div>
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
