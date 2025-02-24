import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SellPetsFrom.css";
import Navbar from "./Navbar";

const dogBreeds = ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Bulldog", "Beagle", "Poodle", "Rottweiler", "Siberian Husky"];
const catBreeds = ["Persian", "Siamese", "Maine Coon", "Bengal", "Sphynx", "Ragdoll", "British Shorthair", "Abyssinian"];

const SellPetsForm = () => {
  const history = useHistory();
  const [petData, setPetData] = useState({
    petName: "",
    petType: "",
    breed: "",
    age: "",
    gender: "",
    vaccination: "",
    ownerName: "",
    phone: "",
    location: "",
    price: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPetData({ ...petData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(petData).forEach((key) => {
      formData.append(key, petData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/sell-pet", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Pet listed successfully!");
        history.push("/");
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      alert("Failed to connect to server!");
    }

    setLoading(false);
  };

  const breedOptions = petData.petType === "Dog" ? dogBreeds : petData.petType === "Cat" ? catBreeds : [];

  return (
    <>
      <Navbar />
      <div className="sell-pet-container">
        <h2>Sell Your Pet 🐾</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="petName" placeholder="Pet Name" value={petData.petName} onChange={handleChange} required />

          <select name="petType" value={petData.petType} onChange={handleChange} required>
            <option value="">Select Pet Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>

          <select name="breed" value={petData.breed} onChange={handleChange} required disabled={!petData.petType}>
            <option value="">Select Breed</option>
            {breedOptions.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>

          <input type="text" name="age" placeholder="Age (e.g., 2 years)" value={petData.age} onChange={handleChange} required />

          <select name="gender" value={petData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select name="vaccination" value={petData.vaccination} onChange={handleChange} required>
            <option value="">Select Vaccination Status</option>
            <option value="Fully Vaccinated">Fully Vaccinated</option>
            <option value="Partially Vaccinated">Partially Vaccinated</option>
            <option value="Not Vaccinated">Not Vaccinated</option>
          </select>

          <input type="text" name="ownerName" placeholder="Owner Name" value={petData.ownerName} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" value={petData.phone} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={petData.location} onChange={handleChange} required />
          <input type="text" name="price" placeholder="Price (e.g., $500)" value={petData.price} onChange={handleChange} required />

          <textarea name="description" placeholder="Description about the pet" value={petData.description} onChange={handleChange} required></textarea>

          <div className="image-upload">
            <label>Upload Pet Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required />
            {preview && <img src={preview} alt="Pet Preview" className="image-preview" />}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Sell Pet"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SellPetsForm;
