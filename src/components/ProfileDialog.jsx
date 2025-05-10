// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/ProfileDialog.css';
// import '../styles/animations.css';

// function ProfileDialog({ onClose, role }) {
//   const [profile, setProfile] = useState({ fullname: '', email: '', phone: '' });
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const email = localStorage.getItem('userEmail');
//       const response = await axios.get(`http://localhost:9010/api/users/profile?email=${email}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProfile(response.data);
//     } catch (error) {
//       setErrorMessage('Failed to fetch profile.');
//     }
//   };

//   return (
//     <div className="profile-dialog" onClick={onClose}>
//       <div className="profile-dialog-content">
//         <h2>{role} Profile</h2>
//         {errorMessage && <div className="error-message shake">{errorMessage}</div>}
//         <p>Name: {profile.fullname}</p>
//         <p>Email: {profile.email}</p>
//         <p>Phone: {profile.phone || 'Not provided'}</p>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// }

// export default ProfileDialog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfileDialog.css';
import '../styles/animations.css';

function ProfileDialog({ onClose, role }) {
  const [profile, setProfile] = useState({ fullname: '', email: '', phno: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:9010/api/users/profile?userId=${userId}`);
      setProfile(response.data);
    } catch (error) {
      setErrorMessage('Failed to fetch profile.');
    }
  };

  return (
    <div className="profile-dialog" onClick={onClose}>
      <div className="profile-dialog-content">
        <h2>{role} Profile</h2>
        {errorMessage && <div className="error-message shake">{errorMessage}</div>}
        <p>Name: {profile.fullname}</p>
        <p>Email: {profile.email}</p>
        <p>Phone: {profile.phno || 'Not provided'}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProfileDialog;