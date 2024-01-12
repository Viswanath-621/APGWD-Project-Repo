
// ProfileForm.js
import React, { useState } from 'react';
import axios from 'axios';


const FormDetails = (props) => {
  const [photo, setPhoto] = useState(null);
  const [photo1, setPhoto1] = useState('');

  const [image,setimage]=useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [editMode, setEditMode] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);
  const {editname}=props;
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setimage(file);
  };

  const DD_PHOTO=import.meta.env.VITE_DD_UPLOAD_PHOTO_ROUTE
  const IMG_CLOUDINARY=import.meta.env.VITE_API_CLOUDINARY_IMAGE_LINK
  const MP4_CLOUDINARY=import.meta.env.VITE_API_CLOUDINARY_VIDEO_LINK
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("resource_type", image.type && image.type.includes("image") ? "image" : "video");
      formData.append('file', image);
      formData.append("upload_preset", "gallery")
      formData.append("cloud_name", "dwttfsaxa")

      const apiURL = image.type.includes("image")
      ? IMG_CLOUDINARY
      :  MP4_CLOUDINARY;
  
      // Send the image file to the server, include the username in the URL
      await fetch(apiURL, {
        method: 'POST',
        body: formData,
      })
      .then((res) => res.json())
        .then((formData) => {
          console.log(formData);
          setPhoto1(formData.url.toString());
          console.log(typeof formData.url);
          console.log(photo1);
        }).catch((err) => {
          console.log(err)
        })

        const response = await axios.post(DD_PHOTO,{photo1,address,name,editname});

  
      // Add logic to handle other form fields and submission (if needed)
  
      const submittedInfo = { photo, name, surname, address };
      // Handle the response from the server
      const responseData = response.data;
      console.log('Server Response:', responseData);   
      console.log('Form submitted:', submittedInfo);
      setSubmittedData(submittedInfo);
      setEditMode(false); // Switch to view mode after submission
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
              <input  placeholder="Enter Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Surname: &nbsp;&nbsp;
              <input  placeholder="Enter Surname" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </label>
          </div>
          <div className="input-container">
            <label>
              Address: &nbsp;&nbsp;
              <input  placeholder="Enter Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </label>
            <label>
            About: &nbsp;&nbsp;
            <input placeholder="Describe yourself" style={{height: "70px"}}/></label>
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