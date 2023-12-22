// ProfileForm.js
import React, { useState } from 'react';


const FormDetails = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [editMode, setEditMode] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to server)
    const submittedInfo = { photo, name, surname, address };
    console.log('Form submitted:', submittedInfo);
    setSubmittedData(submittedInfo);
    setEditMode(false); // Switch to view mode after submission
  };

  const handleEdit = () => {
    setEditMode(true); // Switch back to edit mode
  };

  return (
    <div className="profile-form-container">
      <div className="sidebar">
        <div className="profile-details">
          <h2>Profile Details</h2>
          
        </div>
        <div className="links">
          <a href="/login">Logout</a>
          <a href="#">Change Password</a>
        </div>
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit} className="form-container">
          <label>
            <div className="upload-container">
              <div className="example-image-container">
                {photo ? (
                  <img src={URL.createObjectURL(photo)} alt="Uploaded" style={{ width: '90px', height: '90px', borderRadius: '20%' }} />
                ) : (
                  <img src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg" alt="Example" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                )}
              </div>
              Upload Photo:
              <input type="file" onChange={handlePhotoChange} accept="image/*" />
            </div>
          </label>
          <div className="input-container">
            <label>
              Name: &nbsp;&nbsp;
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Surname: &nbsp;&nbsp;
              <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </label>
          </div>
          <div className="input-container">
            <label>
              Address: &nbsp;&nbsp;
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </label>
          </div>
          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : null}
      
      {!editMode && !submittedData && (
        <div className="no-details-message">
          <p>No details submitted yet.</p>
        </div>
      )}
      {!editMode && submittedData && (
        <div className="submitted-details">
          <h2>Your Details</h2>
          <div className="uploaded-image-container">
            <img src={URL.createObjectURL(submittedData.photo)} alt="Uploaded" style={{ width: '90px', height: '90px', borderRadius: '20%' }} />
          </div>
          <p>Name: &nbsp; {submittedData.name}</p>
          <p>Surname: &nbsp;{submittedData.surname}</p>
          <p>Address: &nbsp;{submittedData.address}</p>
          <div className="button-container">
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDetails;
