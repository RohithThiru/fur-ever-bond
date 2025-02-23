import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SellPetsFrom.css";
import Navbar from "./Navbar";
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
    image: null, // Image file
  });

  const [preview, setPreview] = useState(null); // Preview Image
  const [loading, setLoading] = useState(false); // Button Loading State

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPetData({ ...petData, image: file });

    // Show preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
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
        history.push("/"); // Redirect to homepage
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      alert("Failed to connect to server!");
    }

    setLoading(false);
  };

  return (
    <>
    <Navbar/>
    <div className="sell-pet-container">
      <h2>Sell Your Pet 🐾</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="petName" placeholder="Pet Name" value={petData.petName} onChange={handleChange} required />
        <input type="text" name="petType" placeholder="Pet Type (Dog, Cat...)" value={petData.petType} onChange={handleChange} required />
        <input type="text" name="breed" placeholder="Breed" value={petData.breed} onChange={handleChange} required />
        <input type="text" name="age" placeholder="Age (e.g., 2 years)" value={petData.age} onChange={handleChange} required />
        
        <select name="gender" value={petData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label htmlFor="vaccination">Vaccination Status</label>
<select
  name="vaccination"
  value={petData.vaccination}
  onChange={handleChange}
  required
>
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

        {/* Image Upload */}
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
