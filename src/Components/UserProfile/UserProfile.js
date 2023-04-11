import React, { useState } from "react";
import "./UserProfile.css";

function UserProfile() {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newImage, setNewImage] = useState("");

  const handleImageEdit = () => {
    setIsEditingImage(true);
  };

  const handleImageCancel = () => {
    setIsEditingImage(false);
    setNewImage("");
  };

  const handleImageSave = () => {
    setProfileImage(newImage);
    setIsEditingImage(false);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.value);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div className="user-profile-image-container">
        <img className="user-profile-image" src={profileImage} alt="Profile" />
        {isEditingImage ? (
          <>
            <input 
              className="user-profile-image-edit-input"
              type="text"
              value={newImage} onChange={handleImageChange} />
            <button onClick={handleImageSave}>Save</button>
            <button onClick={handleImageCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={handleImageEdit}>Edit Image</button>
        )}
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
}

export default UserProfile;
