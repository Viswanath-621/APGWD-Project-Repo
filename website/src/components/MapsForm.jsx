import React, { useState, useEffect } from 'react';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
const MapsForm = ({ selectedLocation }) => {
  const [showForm, setShowForm] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
  });
  const [placeName, setPlaceName] = useState('');
  const MAPS_API = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  console.log(MAPS_API)
  

  useEffect(() => {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setFormData({ latitude, longitude });
          fetchPlaceName(latitude, longitude); // Fetch place name
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchPlaceName = async (latitude, longitude) => {
    const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API}`;
    console.log(geocodeApiUrl);
    try {
      const response = await fetch(geocodeApiUrl);
      const data = await response.json();
      if (data.results[0]) {
        setPlaceName(data.results[0].formatted_address);
      } else {
        setPlaceName('Location not found');
      }
    } catch (error) {
      console.error('Error fetching place name:', error);
    }
  };

  
  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleLatitudeChange = (e) => {
    setFormData({ ...formData, latitude: e.target.value });
  };

  const handleLongitudeChange = (e) => {
    setFormData({ ...formData, longitude: e.target.value });
  };



  return (
    <div className="mapsForm-container">
      <div className="form-container">
  {!showForm ? (
    <button className="button" onClick={handleShowForm}>Get User Location</button>
  ) : (
    <form>
      <label>
        Latitude:
        <input type="text" value={formData.latitude} readOnly />
      </label>
      <label>
        Longitude:
        <input type="text" value={formData.longitude} readOnly />
      </label>
      <div className="place-name">
        <strong>Place Name:</strong> {placeName}
      </div>
    </form>
  )}
</div>
{/* 
<div style={{ marginTop: "50px" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "800px",
        }}
        center={selectedLocation}
        zoom={13}
        onLoad={onMapLoad}
      >
        <MarkerF
          position={selectedLocation}
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
      </GoogleMap>
    </div> */}
    </div>
    
  );
  
};

export default MapsForm;


// import React, { useState, useEffect } from 'react';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

// const MapsForm = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [formData, setFormData] = useState({
//     latitude: '',
//     longitude: '',
//   });

//   useEffect(() => {
//     // Check if the browser supports geolocation
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//           setFormData({ latitude, longitude });
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   const handleShowForm = () => {
//     setShowForm(true);
//   };

//   const handleLatitudeChange = (e) => {
//     setFormData({ ...formData, latitude: e.target.value });
//   };

//   const handleLongitudeChange = (e) => {
//     setFormData({ ...formData, longitude: e.target.value });
//   };

//   const MapWithMarker = withScriptjs(
//     withGoogleMap(() => (
//       <GoogleMap defaultCenter={userLocation} defaultZoom={15}>
//         {userLocation && <Marker position={userLocation} />}
//       </GoogleMap>
//     ))
//   );

//   return (
//     <div style={{ display: 'flex' }}>
//       <div style={{ flex: 1 }}>
//         {!showForm ? (
//           <button onClick={handleShowForm}>Get User Location</button>
//         ) : (
//           <form>
//             <label>
//               Latitude:
//               <input type="text" value={formData.latitude} onChange={handleLatitudeChange} readOnly />
//             </label>
//             <br />
//             <label>
//               Longitude:
//               <input type="text" value={formData.longitude} onChange={handleLongitudeChange} readOnly />
//             </label>
//           </form>
//         )}
//       </div>
//       <div style={{ flex: 1 }}>
//         <MapWithMarker
//           googleMapURL={`https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&v=3.exp&libraries=geometry,drawing,places`}
//           loadingElement={<div style={{ height: '100%' }} />}
//           containerElement={<div style={{ height: '100%' }} />}
//           mapElement={<div style={{ height: '100%' }} />}
//         />
//       </div>
//     </div>
//   );
// };

// export default MapsForm;