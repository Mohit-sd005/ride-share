// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProfileDialog from './ProfileDialog';
// import '../styles/RiderDashboard.css';
// import '../styles/animations.css';

// function RiderDashboard() {
//   const [rides, setRides] = useState([]);
//   const [formData, setFormData] = useState({
//     pickupLocation: '',
//     destination: '',
//     dateTime: '',
//     price: '',
//     seatsAvailable: '',
//     vehicleImage: null,
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showProfile, setShowProfile] = useState(false);
//   const riderId = localStorage.getItem('userId');

//   useEffect(() => {
//     fetchRides();
//   }, []);

//   const fetchRides = async () => {
//     try {
//       const response = await axios.get('http://localhost:9010/api/rides/my-rides', {
//         params: { riderId }
//       });
//       setRides(response.data);
//     } catch (error) {
//       setErrorMessage('Failed to fetch rides.');
//     }
//   };

//   const handleChange = (e) => {
//     const { id, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [id]: files ? files[0] : value
//     });
//   };

//   const validateForm = () => {
//     const { pickupLocation, destination, dateTime, price, seatsAvailable } = formData;
//     if (!pickupLocation.trim()) return 'Pickup location is required';
//     if (!destination.trim()) return 'Destination is required';
//     if (!dateTime) return 'Date and time are required';
//     if (!price || price <= 0) return 'Price must be greater than 0';
//     if (!seatsAvailable || seatsAvailable <= 0) return 'Seats available must be greater than 0';
//     return null;
//   };

//   const handlePostRide = async (e) => {
//     e.preventDefault();
//     const validationError = validateForm();
//     if (validationError) {
//       setErrorMessage(validationError);
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('pickupLocation', formData.pickupLocation);
//       formDataToSend.append('destination', formData.destination);
//       formDataToSend.append('dateTime', formData.dateTime);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('seatsAvailable', formData.seatsAvailable);
//       if (formData.vehicleImage) {
//         formDataToSend.append('vehicleImage', formData.vehicleImage);
//       }

//       // Log FormData for debugging
//       console.log('Sending FormData:');
//       console.log('pickupLocation:', formData.pickupLocation);
//       console.log('destination:', formData.destination);
//       console.log('dateTime:', formData.dateTime);
//       console.log('price:', formData.price);
//       console.log('seatsAvailable:', formData.seatsAvailable);
//       console.log('vehicleImage:', formData.vehicleImage?.name || 'none');
//       console.log('riderId:', riderId);

//       const response = await axios.post('http://localhost:9010/api/rides/post?riderId=' + riderId, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setSuccessMessage('Ride posted successfully!');
//       setFormData({
//         pickupLocation: '',
//         destination: '',
//         dateTime: '',
//         price: '',
//         seatsAvailable: '',
//         vehicleImage: null
//       });
//       fetchRides();
//     } catch (error) {
//       console.error('Post ride error:', error.response?.data, error);
//       setErrorMessage(error.response?.data || 'Failed to post ride.');
//     }
//   };

//   const handleDeleteRide = async (rideId) => {
//     try {
//       await axios.delete(`http://localhost:9010/api/rides/${rideId}`, {
//         params: { riderId }
//       });
//       setSuccessMessage('Ride deleted successfully!');
//       fetchRides();
//     } catch (error) {
//       setErrorMessage('Failed to delete ride.');
//     }
//   };

//   const handleConfirmPassenger = async (rideId, requestId) => {
//     try {
//       await axios.post(
//         `http://localhost:9010/api/ride-requests/confirm`,
//         { rideId, requestId, riderId }
//       );
//       setSuccessMessage('Passenger confirmed!');
//       fetchRides();
//     } catch (error) {
//       setErrorMessage('Failed to confirm passenger.');
//     }
//   };

//   const handleEndRide = async (rideId) => {
//     try {
//       await axios.post(
//         `http://localhost:9010/api/rides/end`,
//         { rideId, riderId }
//       );
//       setSuccessMessage('Ride ended successfully!');
//       fetchRides();
//     } catch (error) {
//       setErrorMessage('Failed to end ride.');
//     }
//   };

//   return (
//     <div className="rider-dashboard">
//       <nav className="navbar">
//         <div className="navbar-logo">
//           <img src="/projectlogo.png" alt="RideEasy Logo" />
//           <span>RideEasy</span>
//         </div>
//         <div className="navbar-profile">
//           <img
//             src="/user.png"
//             alt="Profile"
//             onClick={() => setShowProfile(true)}
//           />
//         </div>
//       </nav>
//       {showProfile && (
//         <ProfileDialog
//           onClose={() => setShowProfile(false)}
//           role="RIDER"
//         />
//       )}
//       <div className="dashboard-content">
//         <h1>Rider Dashboard</h1>
//         {errorMessage && <div className="error-message shake">{errorMessage}</div>}
//         {successMessage && (
//           <div className="success-message green-tick">{successMessage}</div>
//         )}
//         <div className="post-ride-form">
//           <h2>Post a New Ride</h2>
//           <form onSubmit={handlePostRide}>
//             <input
//               id="pickupLocation"
//               type="text"
//               placeholder="Pickup Location"
//               value={formData.pickupLocation}
//               onChange={handleChange}
//             />
//             <input
//               id="destination"
//               type="text"
//               placeholder="Destination"
//               value={formData.destination}
//               onChange={handleChange}
//             />
//             <input
//               id="dateTime"
//               type="datetime-local"
//               value={formData.dateTime}
//               onChange={handleChange}
//             />
//             <input
//               id="price"
//               type="number"
//               placeholder="Price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//             <input
//               id="seatsAvailable"
//               type="number"
//               placeholder="Seats Available"
//               value={formData.seatsAvailable}
//               onChange={handleChange}
//             />
//             <input
//               id="vehicleImage"
//               type="file"
//               accept="image/*"
//               onChange={handleChange}
//             />
//             <button type="submit">Post Ride</button>
//           </form>
//         </div>
//         <div className="rides-list">
//           <h2>Your Rides</h2>
//           {rides.map((ride) => (
//             <div key={ride.id} className="ride-card">
//               <p>From: {ride.pickupLocation}</p>
//               <p>To: {ride.destination}</p>
//               <p>Date: {new Date(ride.dateTime).toLocaleString()}</p>
//               <p>Price: ₹{ride.price}</p>
//               <p>Seats: {ride.seatsAvailable}</p>
//               {ride.vehicleImage && (
//                 <p>Vehicle: <img src={`http://localhost:9010/${ride.vehicleImage}`} alt="Vehicle" style={{ maxWidth: '100px' }} /></p>
//               )}
//               {ride.status === 'PENDING' && (
//                 <button onClick={() => handleDeleteRide(ride.id)}>Delete</button>
//               )}
//               {ride.rideRequests?.length > 0 && (
//                 <div className="requests">
//                   <h3>Passenger Requests</h3>
//                   {ride.rideRequests.map((request) => (
//                     <div key={request.id} className="request">
//                       <p>{request.passenger.fullname} ({request.passenger.email})</p>
//                       {request.status === 'PENDING' && (
//                         <button
//                           onClick={() => handleConfirmPassenger(ride.id, request.id)}
//                         >
//                           Confirm
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {ride.status === 'CONFIRMED' && (
//                 <div className="passenger-details">
//                   <h3>Confirmed Passenger</h3>
//                   {ride.rideRequests
//                     .filter((req) => req.status === 'CONFIRMED')
//                     .map((req) => (
//                       <div key={req.id}>
//                         <p>Name: {req.passenger.fullname}</p>
//                         <p>Email: {req.passenger.email}</p>
//                         <p>Phone: {req.passenger.phno || 'Not provided'}</p>
//                       </div>
//                     ))}
//                   <button onClick={() => handleEndRide(ride.id)}>End Ride</button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RiderDashboard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProfileDialog from './ProfileDialog';
// import '../styles/RiderDashboard.css';
// import '../styles/animations.css';

// function RiderDashboard() {
//     const [rides, setRides] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [formData, setFormData] = useState({
//         pickupLocation: '',
//         destination: '',
//         startTime: '',
//         price: '',
//         seatsAvailable: '',
//         vehicleImage: null,
//     });
//     const [editRideId, setEditRideId] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showProfile, setShowProfile] = useState(false);
//     const [selectedRequests, setSelectedRequests] = useState({});
//     const [activeTab, setActiveTab] = useState('rides');
//     const riderId = localStorage.getItem('userId');

//     useEffect(() => {
//         if (activeTab === 'rides') {
//             fetchRides();
//         } else {
//             fetchHistory();
//         }
//     }, [activeTab]);

//     const fetchRides = async () => {
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/my-rides', {
//                 params: { riderId },
//                 withCredentials: true
//             });
//             setRides(response.data);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch rides error:', error.message, error.code);
//             setErrorMessage('Failed to fetch rides. Please try again.');
//         }
//     };

//     const fetchHistory = async () => {
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/history', {
//                 params: { userId: riderId, role: 'RIDER' },
//                 withCredentials: true
//             });
//             setHistory(response.data);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch history error:', error.message, error.code);
//             setErrorMessage('Failed to fetch history. Please try again.');
//         }
//     };

//     const handleChange = (e) => {
//         const { id, value, files } = e.target;
//         if (id === 'vehicleImage' && files[0]) {
//             if (files[0].size > 10 * 1024 * 1024) {
//                 setErrorMessage('Image size exceeds 10MB limit');
//                 return;
//             }
//         }
//         setFormData({
//             ...formData,
//             [id]: files ? files[0] : value
//         });
//     };

//     const validateForm = () => {
//         const { pickupLocation, destination, startTime, price, seatsAvailable } = formData;
//         if (!pickupLocation.trim()) return 'Pickup location is required';
//         if (!destination.trim()) return 'Destination is required';
//         if (!startTime) return 'Start time is required';
//         if (!price || price <= 0) return 'Price must be greater than 0';
//         if (!seatsAvailable || seatsAvailable <= 0) return 'Seats available must be greater than 0';
//         return null;
//     };

//     const handlePostRide = async (e) => {
//         e.preventDefault();
//         const validationError = validateForm();
//         if (validationError) {
//             setErrorMessage(validationError);
//             return;
//         }

//         try {
//             const formDataToSend = new FormData();
//             formDataToSend.append('pickupLocation', formData.pickupLocation);
//             formDataToSend.append('destination', formData.destination);
//             formDataToSend.append('startTime', formData.startTime);
//             formDataToSend.append('price', formData.price);
//             formDataToSend.append('seatsAvailable', formData.seatsAvailable);
//             if (formData.vehicleImage) {
//                 console.log('Uploading vehicleImage:', formData.vehicleImage.name, 'Size:', formData.vehicleImage.size / 1024 / 1024, 'MB');
//                 formDataToSend.append('vehicleImage', formData.vehicleImage);
//             } else {
//                 console.log('No vehicleImage provided');
//             }

//             console.log('Sending POST to /api/rides/post with riderId:', riderId);
//             const response = editRideId
//                 ? await axios.post(`http://localhost:9010/api/rides/edit?rideId=${editRideId}&riderId=${riderId}`, formDataToSend, {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                     withCredentials: true
//                 })
//                 : await axios.post(`http://localhost:9010/api/rides/post?riderId=${riderId}`, formDataToSend, {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                     withCredentials: true
//                 });

//             console.log('Post ride successful:', response.data);
//             setSuccessMessage(editRideId ? 'Ride updated successfully!' : 'Ride posted successfully!');
//             setFormData({
//                 pickupLocation: '',
//                 destination: '',
//                 startTime: '',
//                 price: '',
//                 seatsAvailable: '',
//                 vehicleImage: null
//             });
//             setEditRideId(null);
//             fetchRides();
//         } catch (error) {
//             console.error('Post ride error:', error.message, error.code, error.config?.url);
//             if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_RESET') {
//                 setErrorMessage('Failed to connect to server. Please check if the backend is running and try again.');
//             } else {
//                 setErrorMessage(error.response?.data || 'Failed to post/update ride. Please try again.');
//             }
//         }
//     };

//     const handleEditRide = (ride) => {
//         setEditRideId(ride.id);
//         setFormData({
//             pickupLocation: ride.pickupLocation,
//             destination: ride.destination,
//             startTime: ride.startTime.slice(0, 16),
//             price: ride.price,
//             seatsAvailable: ride.seatsAvailable,
//             vehicleImage: null
//         });
//     };

//     const handleDeleteRide = async (rideId) => {
//         try {
//             await axios.delete(`http://localhost:9010/api/rides/${rideId}`, {
//                 params: { riderId },
//                 withCredentials: true
//             });
//             setSuccessMessage('Ride deleted successfully!');
//             fetchRides();
//         } catch (error) {
//             console.error('Delete ride error:', error.message, error.code);
//             setErrorMessage('Failed to delete ride.');
//         }
//     };

//     const handleConfirmPassengers = async (rideId) => {
//         try {
//             for (const requestId of Object.keys(selectedRequests[rideId] || {}).filter(id => selectedRequests[rideId][id])) {
//                 await axios.post(`http://localhost:9010/api/ride-requests/confirm`, {
//                     rideId,
//                     requestId: parseInt(requestId),
//                     riderId
//                 }, {
//                     withCredentials: true
//                 });
//             }
//             setSuccessMessage('Passengers confirmed!');
//             setSelectedRequests({ ...selectedRequests, [rideId]: {} });
//             fetchRides();
//         } catch (error) {
//             console.error('Confirm passengers error:', error.message, error.code);
//             setErrorMessage('Failed to confirm passengers.');
//         }
//     };

//     const handleEndRide = async (rideId) => {
//         try {
//             await axios.post(`http://localhost:9010/api/rides/end`, { rideId, riderId }, {
//                 withCredentials: true
//             });
//             setSuccessMessage('Ride ended successfully!');
//             fetchRides();
//         } catch (error) {
//             console.error('End ride error:', error.message, error.code);
//             setErrorMessage('Failed to end ride.');
//         }
//     };

//     const toggleRequestSelection = (rideId, requestId) => {
//         setSelectedRequests({
//             ...selectedRequests,
//             [rideId]: {
//                 ...selectedRequests[rideId],
//                 [requestId]: !selectedRequests[rideId]?.[requestId]
//             }
//         });
//     };

//     const hasConfirmedRide = rides.some(ride => ride.status === 'CONFIRMED');

//     return (
//         <div className="rider-dashboard">
//             <nav className="navbar">
//                 <div className="navbar-logo">
//                     <img src="/projectlogo.png" alt="RideEasy Logo" />
//                     <span>RideEasy</span>
//                 </div>
//                 <div className="navbar-links">
//                     <button onClick={() => setActiveTab('rides')} className={activeTab === 'rides' ? 'active' : ''}>Rides</button>
//                     <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>History</button>
//                     <img src="/user.png" alt="Profile" onClick={() => setShowProfile(true)} />
//                 </div>
//             </nav>
//             {showProfile && (
//                 <ProfileDialog onClose={() => setShowProfile(false)} role="RIDER" />
//             )}
//             <div className="dashboard-content">
//                 <h1>Rider Dashboard</h1>
//                 {errorMessage && <div className="error-message shake">{errorMessage}</div>}
//                 {successMessage && <div className="success-message green-tick">{successMessage}</div>}
//                 {activeTab === 'rides' ? (
//                     <>
//                         {!hasConfirmedRide && (
//                             <div className="post-ride-form">
//                                 <h2>{editRideId ? 'Edit Ride' : 'Post a New Ride'}</h2>
//                                 <form onSubmit={handlePostRide}>
//                                     <input id="pickupLocation" type="text" placeholder="Pickup Location" value={formData.pickupLocation} onChange={handleChange} />
//                                     <input id="destination" type="text" placeholder="Destination" value={formData.destination} onChange={handleChange} />
//                                     <input id="startTime" type="datetime-local" value={formData.startTime} onChange={handleChange} />
//                                     <input id="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} />
//                                     <input id="seatsAvailable" type="number" placeholder="Seats Available" value={formData.seatsAvailable} onChange={handleChange} />
//                                     <input id="vehicleImage" type="file" accept="image/*" onChange={handleChange} />
//                                     <button type="submit">{editRideId ? 'Update Ride' : 'Post Ride'}</button>
//                                 </form>
//                             </div>
//                         )}
//                         <div className="rides-list">
//                             <h2>Your Rides</h2>
//                             {rides.length === 0 && <p className="no-data">No ads posted yet.</p>}
//                             <div className="ride-grid">
//                                 {rides.map((ride) => (
//                                     <div key={ride.id} className="ride-card">
//                                         <h3>Ride Details</h3>
//                                         <p><strong>From:</strong> {ride.pickupLocation}</p>
//                                         <p><strong>To:</strong> {ride.destination}</p>
//                                         <p><strong>Date:</strong> {new Date(ride.startTime).toLocaleString()}</p>
//                                         <p><strong>Price:</strong> ₹{ride.price}</p>
//                                         <p><strong>Seats:</strong> {ride.seatsAvailable}</p>
//                                         {ride.vehicleImage && (
//                                             <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${ride.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
//                                         )}
//                                         {ride.status === 'PENDING' && (
//                                             <div className="ride-actions">
//                                                 <button onClick={() => handleEditRide(ride)}>Edit</button>
//                                                 <button onClick={() => handleDeleteRide(ride.id)}>Delete</button>
//                                             </div>
//                                         )}
//                                         {ride.rideRequests?.length > 0 && ride.status === 'PENDING' && (
//                                             <div className="requests">
//                                                 <h3>Passenger Requests</h3>
//                                                 {ride.rideRequests.map((request) => (
//                                                     <div key={request.id} className="request">
//                                                         <label>
//                                                             <input
//                                                                 type="checkbox"
//                                                                 checked={selectedRequests[ride.id]?.[request.id] || false}
//                                                                 onChange={() => toggleRequestSelection(ride.id, request.id)}
//                                                                 disabled={request.status !== 'PENDING'}
//                                                             />
//                                                             {request.passenger.fullname} ({request.passenger.email})
//                                                         </label>
//                                                     </div>
//                                                 ))}
//                                                 <button onClick={() => handleConfirmPassengers(ride.id)} disabled={!Object.values(selectedRequests[ride.id] || {}).some(v => v)}>
//                                                     Confirm Selected
//                                                 </button>
//                                             </div>
//                                         )}
//                                         {ride.status === 'CONFIRMED' && (
//                                             <div className="passenger-details">
//                                                 <h3>Confirmed Passengers</h3>
//                                                 {ride.rideRequests
//                                                     .filter((req) => req.status === 'CONFIRMED')
//                                                     .map((req) => (
//                                                         <div key={req.id} className="passenger-info">
//                                                             <p><strong>Name:</strong> {req.passenger.fullname}</p>
//                                                             <p><strong>Email:</strong> {req.passenger.email}</p>
//                                                             <p><strong>Phone:</strong> {req.passenger.phno || 'Not provided'}</p>
//                                                         </div>
//                                                     ))}
//                                                 <div className="on-journey slide-in">
//                                                     <div className="green-line"></div>
//                                                     <p>On journey...</p>
//                                                 </div>
//                                                 <button onClick={() => handleEndRide(ride.id)}>End Ride</button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="history-list">
//                         <h2>Ride History</h2>
//                         {history.length === 0 && <p className="no-data">No ads posted yet.</p>}
//                         <div className="ride-grid">
//                             {history.map((entry) => (
//                                 <div key={entry.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {entry.pickupLocation}</p>
//                                     <p><strong>To:</strong> {entry.destination}</p>
//                                     <p><strong>Date:</strong> {new Date(entry.startTime).toLocaleString()}</p>
//                                     <p><strong>Price:</strong> ₹{entry.price}</p>
//                                     {entry.vehicleImage && (
//                                         <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${entry.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
//                                     )}
//                                     <h3>Passenger</h3>
//                                     <p><strong>Name:</strong> {entry.passengerName}</p>
//                                     <p><strong>Email:</strong> {entry.passengerEmail}</p>
//                                     <p><strong>Phone:</strong> {entry.passengerPhone}</p>
//                                     <p><strong>Completed:</strong> {new Date(entry.completedAt).toLocaleString()}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default RiderDashboard;


// function RiderDashboard() {
//     const [rides, setRides] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [formData, setFormData] = useState({
//         pickupLocation: '',
//         destination: '',
//         startTime: '',
//         price: '',
//         seatsAvailable: '',
//         vehicleImage: null,
//     });
//     const [editRideId, setEditRideId] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showProfile, setShowProfile] = useState(false);
//     const [selectedProfile, setSelectedProfile] = useState(null);
//     const [selectedRequests, setSelectedRequests] = useState({});
//     const [activeTab, setActiveTab] = useState('rides');
//     const riderId = localStorage.getItem('userId');

//     useEffect(() => {
//         if (activeTab === 'rides') {
//             fetchRides();
//         } else {
//             fetchHistory();
//         }
//     }, [activeTab]);

//     // const fetchRides = async () => {
//     //     try {
//     //         const response = await axios.get('http://localhost:9010/api/rides/my-rides', {
//     //             params: { riderId },
//     //             withCredentials: true
//     //         });
//     //         setRides(Array.isArray(response.data) ? response.data : []);
//     //         setErrorMessage('');
//     //     } catch (error) {
//     //         console.error('Fetch rides error:', error.message, error.code);
//     //         setErrorMessage('Failed to fetch rides. Please try again.');
//     //         setRides([]);
//     //     }
//     // };
//     const fetchRides = async () => {
//     try {
//         const response = await axios.get('http://localhost:9010/api/rides/my-rides', {
//             params: { riderId },
//             withCredentials: true
//         });
//         const rides = Array.isArray(response.data) ? response.data : [];
//         console.log('Fetched rides with requests:', rides);
//         setRides(rides);
//         setErrorMessage('');
//     } catch (error) {
//         console.error('Fetch rides error:', error.message, error.code);
//         setErrorMessage('Failed to fetch rides. Please try again.');
//         setRides([]);
//     }
// };

//     const fetchRideHistory = async () => {
//     if (!riderId) {
//         setErrorMessage('Please log in to view history.');
//         navigate('/login');
//         return;
//     }
//     setIsLoading(true);
//     try {
//         const response = await axios.get('http://localhost:9010/api/rides/history', {
//             params: { userId: riderId, role: 'RIDER' },
//             withCredentials: true
//         });
//         console.log('Ride history response:', response.data);
//         const history = Array.isArray(response.data) ? response.data : [];
//         setRideHistory(history);
//         setErrorMessage('');
//     } catch (error) {
//         console.error('Fetch history error:', error);
//         let errorMsg = 'Failed to fetch ride history.';
//         if (error.response) {
//             errorMsg = error.response.status === 404
//                 ? 'History endpoint not found. Verify /api/rides/history is mapped in backend.'
//                 : typeof error.response.data === 'string' ? error.response.data : `Server error: ${error.response.status}`;
//         } else if (error.request) {
//             errorMsg = 'No response from server. Check if backend is running on port 9010.';
//         }
//         setErrorMessage(errorMsg);
//         setRideHistory([]);
//     } finally {
//         setIsLoading(false);
//     }
// };

//     const handleChange = (e) => {
//         const { id, value, files } = e.target;
//         if (id === 'vehicleImage' && files[0]) {
//             if (files[0].size > 10 * 1024 * 1024) {
//                 setErrorMessage('Image size exceeds 10MB limit');
//                 return;
//             }
//         }
//         setFormData({
//             ...formData,
//             [id]: files ? files[0] : value
//         });
//     };

//     const validateForm = () => {
//         const { pickupLocation, destination, startTime, price, seatsAvailable } = formData;
//         if (!pickupLocation.trim()) return 'Pickup location is required';
//         if (!destination.trim()) return 'Destination is required';
//         if (!startTime) return 'Start time is required';
//         if (!price || price <= 0) return 'Price must be greater than 0';
//         if (!seatsAvailable || seatsAvailable <= 0) return 'Seats available must be greater than 0';
//         return null;
//     };

//     const handlePostRide = async (e) => {
//         e.preventDefault();
//         const validationError = validateForm();
//         if (validationError) {
//             setErrorMessage(validationError);
//             return;
//         }

//         try {
//             const formDataToSend = new FormData();
//             formDataToSend.append('pickupLocation', formData.pickupLocation);
//             formDataToSend.append('destination', formData.destination);
//             formDataToSend.append('startTime', formData.startTime);
//             formDataToSend.append('price', formData.price);
//             formDataToSend.append('seatsAvailable', formData.seatsAvailable);
//             if (formData.vehicleImage) {
//                 formDataToSend.append('vehicleImage', formData.vehicleImage);
//             }

//             const response = editRideId
//                 ? await axios.post(`http://localhost:9010/api/rides/edit?rideId=${editRideId}&riderId=${riderId}`, formDataToSend, {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                     withCredentials: true
//                 })
//                 : await axios.post(`http://localhost:9010/api/rides/post?riderId=${riderId}`, formDataToSend, {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                     withCredentials: true
//                 });

//             setSuccessMessage(editRideId ? 'Ride updated successfully!' : 'Ride posted successfully!');
//             setFormData({
//                 pickupLocation: '',
//                 destination: '',
//                 startTime: '',
//                 price: '',
//                 seatsAvailable: '',
//                 vehicleImage: null
//             });
//             setEditRideId(null);
//             fetchRides();
//         } catch (error) {
//             console.error('Post ride error:', error.message, error.code, error.config?.url);
//             setErrorMessage(error.response?.data || 'Failed to post/update ride. Please try again.');
//         }
//     };

//     const handleEditRide = (ride) => {
//         setEditRideId(ride.id);
//         setFormData({
//             pickupLocation: ride.pickupLocation,
//             destination: ride.destination,
//             startTime: ride.startTime.slice(0, 16),
//             price: ride.price,
//             seatsAvailable: ride.seatsAvailable,
//             vehicleImage: null
//         });
//     };

//     const handleDeleteRide = async (rideId) => {
//         try {
//             await axios.delete(`http://localhost:9010/api/rides/${rideId}`, {
//                 params: { riderId },
//                 withCredentials: true
//             });
//             setSuccessMessage('Ride deleted successfully!');
//             fetchRides();
//         } catch (error) {
//             console.error('Delete ride error:', error.message, error.code);
//             setErrorMessage('Failed to delete ride.');
//         }
//     };

//     const handleConfirmPassengers = async (rideId) => {
//         try {
//             for (const requestId of Object.keys(selectedRequests[rideId] || {}).filter(id => selectedRequests[rideId][id])) {
//                 await axios.post(`http://localhost:9010/api/ride-requests/confirm`, {
//                     rideId,
//                     requestId: parseInt(requestId),
//                     riderId
//                 }, {
//                     withCredentials: true
//                 });
//             }
//             setSuccessMessage('Passengers confirmed!');
//             setSelectedRequests({ ...selectedRequests, [rideId]: {} });
//             fetchRides();
//         } catch (error) {
//             console.error('Confirm passengers error:', error.message, error.code);
//             setErrorMessage('Failed to confirm passengers.');
//         }
//     };

//     const handleEndRide = async (rideId) => {
//         try {
//             await axios.post(`http://localhost:9010/api/rides/end`, { rideId, riderId }, {
//                 withCredentials: true
//             });
//             setSuccessMessage('Ride ended successfully!');
//             fetchRides();
//         } catch (error) {
//             console.error('End ride error:', error.message, error.code);
//             setErrorMessage('Failed to end ride.');
//         }
//     };

//     const toggleRequestSelection = (rideId, requestId) => {
//         setSelectedRequests({
//             ...selectedRequests,
//             [rideId]: {
//                 ...selectedRequests[rideId],
//                 [requestId]: !selectedRequests[rideId]?.[requestId]
//             }
//         });
//     };

//     // const handleViewProfile = (passenger) => {
//     //     setSelectedProfile({
//     //         role: 'PASSENGER',
//     //         user: {
//     //             id: passenger.id,
//     //             fullname: passenger.fullname,
//     //             email: passenger.email,
//     //             phno: passenger.phno
//     //         }
//     //     });
//     // };
//     const handleViewProfile = async (rideId, passenger) => {
//     try {
//         const response = await axios.get('http://localhost:9010/api/ride-requests/confirmed-profiles', {
//             params: { rideId, userId: riderId },
//             withCredentials: true
//         });
//         console.log('Confirmed passenger profiles:', response.data);
//         const profile = response.data.find(p => p.id === passenger.id.toString()) || {
//             id: passenger.id,
//             fullname: passenger.fullname || 'Unknown',
//             email: passenger.email || 'Unknown',
//             phno: passenger.phno || 'Not provided'
//         };
//         setSelectedProfile({
//             role: 'PASSENGER',
//             user: {
//                 id: profile.id,
//                 fullname: profile.fullname,
//                 email: profile.email,
//                 phno: profile.phno
//             }
//         });
//     } catch (error) {
//         console.error('Fetch passenger profile error:', error);
//         setErrorMessage('Failed to fetch passenger profile.');
//         // Fallback to existing data
//         setSelectedProfile({
//             role: 'PASSENGER',
//             user: {
//                 id: passenger.id,
//                 fullname: passenger.fullname || 'Unknown',
//                 email: passenger.email || 'Unknown',
//                 phno: passenger.phno || 'Not provided'
//             }
//         });
//     }
// };

// // const handleRejectRequest = async (rideId, requestId) => {
// //     try {
// //         const response = await axios.post(`http://localhost:9010/api/ride-requests/reject`, {
// //             rideId,
// //             requestId,
// //             riderId
// //         }, {
// //             withCredentials: true
// //         });
// //         console.log('Reject request response:', response.data);
// //         setSuccessMessage('Request rejected successfully!');
// //         fetchRides();
// //     } catch (error) {
// //         console.error('Reject request error:', error.message, error.code);
// //         setErrorMessage('Failed to reject request.');
// //     }
// // };

// const handleRejectRequest = async (rideId, requestId) => {
//     try {
//         const response = await axios.post(`http://localhost:9010/api/ride-requests/reject`, {
//             rideId,
//             requestId,
//             riderId
//         }, {
//             withCredentials: true
//         });
//         console.log('Reject request response:', response.data);
//         setSuccessMessage('Request rejected successfully!');
//         fetchRides();
//     } catch (error) {
//         console.error('Reject request error:', error.message, error.code);
//         setErrorMessage('Failed to reject request.');
//     }
// };

//     const closeProfileDialog = () => {
//         setSelectedProfile(null);
//     };

//     const hasConfirmedRide = rides.some(ride => ride.status === 'CONFIRMED');
//     const pendingRides = rides.filter(ride => ride.status === 'PENDING');
//     const confirmedRides = rides.filter(ride => ride.status === 'CONFIRMED');

//     return (
//         <div className="rider-dashboard">
//             <nav className="navbar">
//                 <div className="navbar-logo">
//                     <img src="/projectlogo.png" alt="RideEasy Logo" />
//                     <span>RideEasy</span>
//                 </div>
//                 <div className="navbar-links">
//                     <button onClick={() => setActiveTab('rides')} className={activeTab === 'rides' ? 'active' : ''}>Rides</button>
//                     <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>History</button>
//                     <img src="/user.png" alt="Profile" onClick={() => setShowProfile(true)} />
//                 </div>
//             </nav>
//             {showProfile && (
//                 <ProfileDialog onClose={() => setShowProfile(false)} role="RIDER" />
//             )}
//             {selectedProfile && (
//                 <ProfileDialog
//                     onClose={closeProfileDialog}
//                     role={selectedProfile.role}
//                     user={selectedProfile.user}
//                 />
//             )}
//             <div className="dashboard-content">
//                 <h1>Rider Dashboard</h1>
//                 {errorMessage && <div className="error-message shake">{errorMessage}</div>}
//                 {successMessage && <div className="success-message green-tick">{successMessage}</div>}
//                 {activeTab === 'rides' ? (
//                     <>
//                         {!hasConfirmedRide && (
//                             <div className="post-ride-form">
//                                 <h2>{editRideId ? 'Edit Ride' : 'Post a New Ride'}</h2>
//                                 <form onSubmit={handlePostRide}>
//                                     <input id="pickupLocation" type="text" placeholder="Pickup Location" value={formData.pickupLocation} onChange={handleChange} />
//                                     <input id="destination" type="text" placeholder="Destination" value={formData.destination} onChange={handleChange} />
//                                     <input id="startTime" type="datetime-local" value={formData.startTime} onChange={handleChange} />
//                                     <input id="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} />
//                                     <input id="seatsAvailable" type="number" placeholder="Seats Available" value={formData.seatsAvailable} onChange={handleChange} />
//                                     <input id="vehicleImage" type="file" accept="image/*" onChange={handleChange} />
//                                     <button type="submit">{editRideId ? 'Update Ride' : 'Post Ride'}</button>
//                                 </form>
//                             </div>
//                         )}
//                         {/* <div className="rides-list">
//                             <h2>Your Pending Rides</h2>
//                             {pendingRides.length === 0 && <p className="no-data">No pending rides posted.</p>}
//                             <div className="ride-grid">
//                                 {pendingRides.map((ride) => (
//                                     <div key={ride.id} className="ride-card">
//                                         <h3>Ride Details</h3>
//                                         <p><strong>From:</strong> {ride.pickupLocation}</p>
//                                         <p><strong>To:</strong> {ride.destination}</p>
//                                         <p><strong>Date:</strong> {new Date(ride.startTime).toLocaleString()}</p>
//                                         <p><strong>Price:</strong> ₹{ride.price}</p>
//                                         <p><strong>Seats:</strong> {ride.seatsAvailable}</p>
//                                         {ride.vehicleImage && (
//                                             <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${ride.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
//                                         )}
//                                         <div className="ride-actions">
//                                             <button onClick={() => handleEditRide(ride)}>Edit</button>
//                                             <button onClick={() => handleDeleteRide(ride.id)}>Delete</button>
//                                         </div>
//                                         {ride.rideRequests?.length > 0 && (
//                                             <div className="requests">
//                                                 <h3>Passenger Requests</h3>
//                                                 {ride.rideRequests.map((request) => (
//                                                     <div key={request.id} className="request">
//                                                         <label>
//                                                             <input
//                                                                 type="checkbox"
//                                                                 checked={selectedRequests[ride.id]?.[request.id] || false}
//                                                                 onChange={() => toggleRequestSelection(ride.id, request.id)}
//                                                                 disabled={request.status !== 'PENDING'}
//                                                             />
//                                                             {request.passenger.fullname} ({request.passenger.email})
//                                                         </label>
//                                                     </div>
//                                                 ))}
//                                                 <button onClick={() => handleConfirmPassengers(ride.id)} disabled={!Object.values(selectedRequests[ride.id] || {}).some(v => v)}>
//                                                     Confirm Selected
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                             {confirmedRides.length > 0 && (
//                                 <>
//                                     <h2>Your Confirmed Rides</h2>
//                                     <div className="ride-grid">
//                                         {confirmedRides.map((ride) => (
//                                             <div key={ride.id} className="ride-card">
//                                                 <h3>Ride Details</h3>
//                                                 <p><strong>From:</strong> {ride.pickupLocation}</p>
//                                                 <p><strong>To:</strong> {ride.destination}</p>
//                                                 <p><strong>Date:</strong> {new Date(ride.startTime).toLocaleString()}</p>
//                                                 <p><strong>Price:</strong> ₹{ride.price}</p>
//                                                 <p><strong>Seats:</strong> {ride.seatsAvailable}</p>
//                                                 {ride.vehicleImage && (
//                                                     <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${ride.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
//                                                 )}
//                                                 <div className="passenger-details">
//                                                     <h3>Confirmed Passengers</h3>
//                                                     {ride.rideRequests
//                                                         .filter((req) => req.status === 'CONFIRMED')
//                                                         .map((req) => (
//                                                             <div key={req.id} className="passenger-info">
//                                                                 <button onClick={() => handleViewProfile(ride.id, req.passenger)}>View Passenger Profile</button>
//                                                             </div>
//                                                         ))}
//                                                     <div className="on-journey slide-in">
//                                                         <div className="green-line"></div>
//                                                         <p>On journey...</p>
//                                                     </div>
//                                                     <button onClick={() => handleEndRide(ride.id)}>End Ride</button>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                          */}
//                          <div className="rides-list">
//     <h2>Your Pending Rides</h2>
//     {pendingRides.length === 0 && <p className="no-data">No pending rides posted.</p>}
//     <div className="ride-grid">
//         {pendingRides.map((ride) => (
//             <div key={ride.id} className="ride-card">
//                 <h3>Ride Details</h3>
//                 <p><strong>From:</strong> {ride.pickupLocation}</p>
//                 <p><strong>To:</strong> {ride.destination}</p>
//                 <p><strong>Date:</strong> {new Date(ride.startTime).toLocaleString()}</p>
//                 <p><strong>Price:</strong> ₹{ride.price}</p>
//                 <p><strong>Seats:</strong> {ride.seatsAvailable}</p>
//                 {ride.vehicleImage && (
//                     <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${ride.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
//                 )}
//                 <div className="ride-actions">
//                     <button onClick={() => handleEditRide(ride)}>Edit</button>
//                     <button onClick={() => handleDeleteRide(ride.id)}>Delete</button>
//                 </div>
//                 {ride.rideRequests?.length > 0 && (
//                     <div className="requests">
//                         <h3>Passenger Requests</h3>
//                         {ride.rideRequests.map((request) => (
//                             <div key={request.id} className="request">
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedRequests[ride.id]?.[request.id] || false}
//                                         onChange={() => toggleRequestSelection(ride.id, request.id)}
//                                         disabled={request.status !== 'PENDING'}
//                                     />
//                                     {request.passenger.fullname} ({request.passenger.email})
//                                 </label>
//                                 {request.status === 'PENDING' && (
//                                     <button onClick={() => handleRejectRequest(ride.id, request.id)}>
//                                         Reject
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                         <button 
//                             onClick={() => handleConfirmPassengers(ride.id)} 
//                             disabled={!Object.values(selectedRequests[ride.id] || {}).some(v => v)}
//                         >
//                             Confirm Selected
//                         </button>
//                     </div>
//                 )}
//             </div>
//         ))}
//     </div>
//     {/* Rest of the confirmedRides section remains unchanged */}
// </div>
//                     </>
//                 ) : (
//                     <div className="history-list">
//                         <h2>Ride History</h2>
//                         {history.length === 0 && <p className="no-data">No ads posted yet.</p>}
//                         <div className="ride-grid">
//                             {history.map((entry) => (
//                                 <div key={entry.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {entry.pickupLocation}</p>
//                                     <p><strong>To:</strong> {entry.destination}</p>
//                                     <p><strong>Date:</strong> {new Date(entry.startTime).toLocaleString()}</p>
//                                     <p><strong>Price:</strong> ₹{entry.price}</p>
//                                     {entry.vehicleImage && (
//                                         <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${entry.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
//                                     )}
//                                     <h3>Passenger</h3>
//                                     <p><strong>Name:</strong> {entry.passengerName}</p>
//                                     <p><strong>Email:</strong> {entry.passengerEmail}</p>
//                                     <p><strong>Phone:</strong> {entry.passengerPhone}</p>
//                                     <p><strong>Completed:</strong> {new Date(entry.completedAt).toLocaleString()}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default RiderDashboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileDialog from './ProfileDialog';
import '../styles/RiderDashboard.css';
import '../styles/animations.css';
import { useNavigate } from 'react-router-dom';
// function RiderDashboard() {
//     const [myRides, setMyRides] = useState([]);
//     const [rideRequests, setRideRequests] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showProfile, setShowProfile] = useState(false);
//     const [selectedProfile, setSelectedProfile] = useState(null);
//     const [activeTab, setActiveTab] = useState('my-rides');
//     const [isLoading, setIsLoading] = useState(false);
//     const [riderId, setRiderId] = useState(localStorage.getItem('userId'));
//     // Form state for posting a ride
//     const [rideForm, setRideForm] = useState({
//         pickupLocation: '',
//         destination: '',
//         startTime: '',
//         price: '',
//         seatsAvailable: '',
//         vehicleImage: null
//     });
//     const navigate = useNavigate();

//     // Validate current user
//     const fetchCurrentUser = async () => {
//         const userId = localStorage.getItem('userId');
//         const userRole = localStorage.getItem('userRole');
//         if (!userId || !userRole) {
//             setErrorMessage('Please log in to access the dashboard.');
//             navigate('/');
//             return;
//         }
//         if (userRole !== 'RIDER') {
//             setErrorMessage('Access denied. Only riders can access this dashboard.');
//             localStorage.clear();
//             navigate('/');
//             return;
//         }
//         try {
//             const response = await axios.get('http://localhost:9010/api/users/profile', {
//                 params: { userId },
//                 withCredentials: true
//             });
//             console.log('User profile response:', response.data);
//             setRiderId(userId);
//         } catch (error) {
//             console.error('Fetch user profile error:', error);
//             setErrorMessage('Failed to fetch user profile. Please log in again.');
//             localStorage.clear();
//             navigate('/');
//         }
//     };

//     // Fetch rider's posted rides
//     const fetchMyRides = async (retryCount = 3, delay = 1000) => {
//         if (!riderId) {
//             setErrorMessage('Please log in to access rides.');
//             navigate('/');
//             return;
//         }
//         setIsLoading(true);
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/my-rides', {
//                 params: { riderId },
//                 withCredentials: true
//             });
//             console.log('My rides response:', response.data);
//             const rides = Array.isArray(response.data) ? response.data : [];
//             setMyRides(rides);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch my rides error:', error);
//             let errorMsg = 'Failed to fetch your rides.';
//             if (error.response) {
//                 errorMsg = error.response.data || `Server error: ${error.response.status}`;
//                 if (error.response.status === 400 && retryCount > 0) {
//                     await new Promise(resolve => setTimeout(resolve, delay));
//                     return fetchMyRides(retryCount - 1, delay * 2);
//                 }
//             } else if (error.request) {
//                 errorMsg = 'No response from server. Check backend on port 9010.';
//             }
//             setErrorMessage(errorMsg);
//             setMyRides([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Fetch ride requests for rider's rides
//     const fetchRideRequests = async (retryCount = 3, delay = 1000) => {
//         if (!riderId) {
//             setErrorMessage('Please log in to access requests.');
//             navigate('/');
//             return;
//         }
//         setIsLoading(true);
//         try {
//             const response = await axios.get('http://localhost:9010/api/ride-requests/rider-requests', {
//                 params: { riderId },
//                 withCredentials: true
//             });
//             console.log('Ride requests response:', response.data);
//             const requests = Array.isArray(response.data) ? response.data : [];
//             setRideRequests(requests);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch ride requests error:', error);
//             let errorMsg = 'Failed to fetch ride requests.';
//             if (error.response) {
//                 errorMsg = error.response.data || `Server error: ${error.response.status}`;
//                 if (error.response.status === 400 && retryCount > 0) {
//                     await new Promise(resolve => setTimeout(resolve, delay));
//                     return fetchRideRequests(retryCount - 1, delay * 2);
//                 }
//             } else if (error.request) {
//                 errorMsg = 'No response from server. Check backend.';
//             }
//             setErrorMessage(errorMsg);
//             setRideRequests([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Fetch ride history
//     const fetchRideHistory = async () => {
//         if (!riderId) {
//             setErrorMessage('Please log in to view history.');
//             navigate('/');
//             return;
//         }
//         setIsLoading(true);
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/history', {
//                 params: { userId: riderId, role: 'RIDER' },
//                 withCredentials: true
//             });
//             console.log('Ride history response:', response.data);
//             const history = Array.isArray(response.data) ? response.data : [];
//             setHistory(history);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch history error:', error);
//             let errorMsg = 'Failed to fetch ride history.';
//             if (error.response) {
//                 errorMsg = error.response.status === 404
//                     ? 'History endpoint not found. Verify /api/rides/history.'
//                     : error.response.data || `Server error: ${error.response.status}`;
//             } else if (error.request) {
//                 errorMsg = 'No response from server. Check backend on port 9010.';
//             }
//             setErrorMessage(errorMsg);
//             setHistory([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Handle ride form input changes
//     const handleRideFormChange = (e) => {
//         const { name, value, files } = e.target;
//         setRideForm(prev => ({
//             ...prev,
//             [name]: files ? files[0] : value
//         }));
//     };

//     // Validate and post a new ride
//     const handlePostRide = async (e) => {
//         e.preventDefault();
//         if (!riderId) {
//             setErrorMessage('Please log in to post a ride.');
//             navigate('/');
//             return;
//         }
//         const { pickupLocation, destination, startTime, price, seatsAvailable, vehicleImage } = rideForm;
//         if (!pickupLocation || !destination || !startTime || !price || !seatsAvailable) {
//             setErrorMessage('All fields except vehicle image are required.');
//             return;
//         }
//         if (isNaN(price) || price <= 0) {
//             setErrorMessage('Price must be a positive number.');
//             return;
//         }
//         if (isNaN(seatsAvailable) || seatsAvailable <= 0) {
//             setErrorMessage('Seats available must be a positive number.');
//             return;
//         }
//         try {
//             const formData = new FormData();
//             formData.append('pickupLocation', pickupLocation);
//             formData.append('destination', destination);
//             formData.append('startTime', startTime);
//             formData.append('price', price);
//             formData.append('seatsAvailable', seatsAvailable);
//             formData.append('riderId', riderId);
//             if (vehicleImage) {
//                 formData.append('vehicleImage', vehicleImage);
//             }
//             const response = await axios.post('http://localhost:9010/api/rides/post', formData, {
//                 withCredentials: true
//             });
//             console.log('Post ride response:', response.data);
//             setSuccessMessage('Ride posted successfully!');
//             setRideForm({
//                 pickupLocation: '',
//                 destination: '',
//                 startTime: '',
//                 price: '',
//                 seatsAvailable: '',
//                 vehicleImage: null
//             });
//             document.getElementById('vehicleImage').value = ''; // Reset file input
//             fetchMyRides();
//         } catch (error) {
//             console.error('Post ride error:', error);
//             setErrorMessage(error.response?.data || 'Failed to post ride.');
//         }
//     };

//     // End a ride
//     const handleEndRide = async (rideId) => {
//         if (!riderId) {
//             setErrorMessage('Please log in to end a ride.');
//             navigate('/');
//             return;
//         }
//         try {
//             const response = await axios.post('http://localhost:9010/api/rides/end', null, {
//                 params: { rideId, riderId },
//                 withCredentials: true
//             });
//             console.log('End ride response:', response.data);
//             setSuccessMessage('Ride ended successfully!');
//             fetchMyRides();
//             fetchRideHistory();
//         } catch (error) {
//             console.error('End ride error:', error);
//             setErrorMessage(error.response?.data || 'Failed to end ride.');
//         }
//     };

//     // Confirm a ride request
//     const handleConfirmRequest = async (rideId, requestId) => {
//         if (!riderId) {
//             setErrorMessage('Please log in to confirm requests.');
//             navigate('/');
//             return;
//         }
//         try {
//             const response = await axios.post('http://localhost:9010/api/ride-requests/confirm', {
//                 rideId,
//                 requestId,
//                 riderId
//             }, {
//                 withCredentials: true
//             });
//             console.log('Confirm request response:', response.data);
//             setSuccessMessage('Request confirmed successfully!');
//             fetchRideRequests();
//             fetchMyRides();
//         } catch (error) {
//             console.error('Confirm request error:', error);
//             setErrorMessage(error.response?.data || 'Failed to confirm request.');
//         }
//     };

//     // View passenger profile
//     const handleViewProfile = async (rideId, passenger) => {
//         if (!riderId) {
//             setErrorMessage('Please log in to view profiles.');
//             navigate('/');
//             return;
//         }
//         try {
//             const response = await axios.get('http://localhost:9010/api/ride-requests/confirmed-profiles', {
//                 params: { rideId, userId: riderId },
//                 withCredentials: true
//             });
//             console.log('Confirmed passenger profile:', response.data);
//             const profile = response.data[0] || {
//                 id: passenger.id,
//                 fullname: passenger.fullname || 'Unknown',
//                 email: passenger.email || 'Unknown',
//                 phno: passenger.phno || 'Not provided'
//             };
//             setSelectedProfile({
//                 role: 'PASSENGER',
//                 user: {
//                     id: profile.id,
//                     fullname: profile.fullname,
//                     email: profile.email,
//                     phno: profile.phno
//                 }
//             });
//         } catch (error) {
//             console.error('Fetch passenger profile error:', error);
//             setErrorMessage('Failed to fetch passenger profile.');
//             setSelectedProfile({
//                 role: 'PASSENGER',
//                 user: {
//                     id: passenger.id,
//                     fullname: passenger.fullname || 'Unknown',
//                     email: passenger.email || 'Unknown',
//                     phno: passenger.phno || 'Not provided'
//                 }
//             });
//         }
//     };

//     // Logout
//     const handleLogout = () => {
//         localStorage.clear();
//         navigate('/');
//     };

//     const closeProfileDialog = () => {
//         setSelectedProfile(null);
//     };

//     // Fetch user on mount
//     useEffect(() => {
//         fetchCurrentUser();
//     }, []);

//     // Fetch data based on active tab
//     useEffect(() => {
//         if (riderId) {
//             if (activeTab === 'my-rides') {
//                 fetchMyRides();
//             } else if (activeTab === 'requests') {
//                 fetchRideRequests();
//             } else if (activeTab === 'history') {
//                 fetchRideHistory();
//             }
//         }
//     }, [activeTab, riderId]);

//     return (
//         <div className="rider-dashboard">
//             <nav className="navbar">
//                 <div className="navbar-logo">
//                     <img src="/projectlogo.png" alt="RideEasy Logo" />
//                     <span>RideEasy</span>
//                 </div>
//                 <div className="navbar-links">
//                     <button onClick={() => setActiveTab('my-rides')} className={activeTab === 'my-rides' ? 'active' : ''}>
//                         My Rides
//                     </button>
//                     <button onClick={() => setActiveTab('requests')} className={activeTab === 'requests' ? 'active' : ''}>
//                         Ride Requests
//                     </button>
//                     <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
//                         History
//                     </button>
//                     <button onClick={handleLogout}>Logout</button>
//                     <img src="/user.png" alt="Profile" onClick={() => setShowProfile(true)} />
//                 </div>
//             </nav>
//             {showProfile && (
//                 <ProfileDialog onClose={() => setShowProfile(false)} role="RIDER" />
//             )}
//             {selectedProfile && (
//                 <ProfileDialog
//                     onClose={closeProfileDialog}
//                     role={selectedProfile.role}
//                     user={selectedProfile.user}
//                 />
//             )}
//             <div className="dashboard-content">
//                 <h1>Rider Dashboard</h1>
//                 {errorMessage && (
//                     <div className="error-message shake">
//                         {errorMessage}
//                         <button
//                             onClick={() => {
//                                 if (activeTab === 'my-rides') fetchMyRides();
//                                 else if (activeTab === 'requests') fetchRideRequests();
//                                 else fetchRideHistory();
//                             }}
//                         >
//                             Retry
//                         </button>
//                     </div>
//                 )}
//                 {successMessage && <div className="success-message green-tick">{successMessage}</div>}
//                 {isLoading && <p>Loading...</p>}
//                 {activeTab === 'my-rides' ? (
//                     <div className="rides-list">
//                         <h2>My Rides</h2>
//                         <div className="post-ride-form">
//                             <h3>Post a New Ride</h3>
//                             <form onSubmit={handlePostRide}>
//                                 <label htmlFor="pickupLocation">Pickup Location*</label>
//                                 <input
//                                     type="text"
//                                     id="pickupLocation"
//                                     name="pickupLocation"
//                                     value={rideForm.pickupLocation}
//                                     onChange={handleRideFormChange}
//                                     placeholder="Enter pickup location"
//                                 />
//                                 <label htmlFor="destination">Destination*</label>
//                                 <input
//                                     type="text"
//                                     id="destination"
//                                     name="destination"
//                                     value={rideForm.destination}
//                                     onChange={handleRideFormChange}
//                                     placeholder="Enter destination"
//                                 />
//                                 <label htmlFor="startTime">Start Time*</label>
//                                 <input
//                                     type="datetime-local"
//                                     id="startTime"
//                                     name="startTime"
//                                     value={rideForm.startTime}
//                                     onChange={handleRideFormChange}
//                                 />
//                                 <label htmlFor="price">Price (₹)*</label>
//                                 <input
//                                     type="number"
//                                     id="price"
//                                     name="price"
//                                     value={rideForm.price}
//                                     onChange={handleRideFormChange}
//                                     placeholder="Enter price"
//                                     min="1"
//                                 />
//                                 <label htmlFor="seatsAvailable">Seats Available*</label>
//                                 <input
//                                     type="number"
//                                     id="seatsAvailable"
//                                     name="seatsAvailable"
//                                     value={rideForm.seatsAvailable}
//                                     onChange={handleRideFormChange}
//                                     placeholder="Enter number of seats"
//                                     min="1"
//                                 />
//                                 <label htmlFor="vehicleImage">Vehicle Image (Optional)</label>
//                                 <input
//                                     type="file"
//                                     id="vehicleImage"
//                                     name="vehicleImage"
//                                     accept="image/*"
//                                     onChange={handleRideFormChange}
//                                 />
//                                 <button type="submit">Post Ride</button>
//                             </form>
//                         </div>
//                         {myRides.length === 0 && !isLoading && <p className="no-data">No rides posted yet.</p>}
//                         <div className="ride-grid">
//                             {myRides.map((ride) => (
//                                 <div key={ride.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {ride.pickupLocation || 'N/A'}</p>
//                                     <p><strong>To:</strong> {ride.destination || 'N/A'}</p>
//                                     <p><strong>Date:</strong> {ride.startTime ? new Date(ride.startTime).toLocaleString() : 'N/A'}</p>
//                                     <p><strong>Price:</strong> ₹{ride.price || 'N/A'}</p>
//                                     <p><strong>Seats:</strong> {ride.seatsAvailable || 'N/A'}</p>
//                                     {ride.vehicleImage && (
//                                         <p>
//                                             <strong>Vehicle:</strong>
//                                             <img
//                                                 src={`http://localhost:9010/${ride.vehicleImage}`}
//                                                 alt="Vehicle"
//                                                 className="vehicle-image"
//                                                 onError={(e) => (e.target.src = '/placeholder.png')}
//                                             />
//                                         </p>
//                                     )}
//                                     <button onClick={() => handleEndRide(ride.id)}>End Ride</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : activeTab === 'requests' ? (
//                     <div className="requests-list">
//                         <h2>Ride Requests</h2>
//                         {rideRequests.length === 0 && !isLoading && <p className="no-data">No ride requests yet.</p>}
//                         <div className="ride-grid">
//                             {myRides.map((ride) => (
//                                 <div key={ride.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {ride.pickupLocation || 'N/A'}</p>
//                                     <p><strong>To:</strong> {ride.destination || 'N/A'}</p>
//                                     <p><strong>Date:</strong> {ride.startTime ? new Date(ride.startTime).toLocaleString() : 'N/A'}</p>
//                                     <p><strong>Price:</strong> ₹{ride.price || 'N/A'}</p>
//                                     <p><strong>Seats:</strong> {ride.seatsAvailable || 'N/A'}</p>
//                                     {ride.vehicleImage && (
//                                         <p>
//                                             <strong>Vehicle:</strong>
//                                             <img
//                                                 src={`http://localhost:9010/${ride.vehicleImage}`}
//                                                 alt="Vehicle"
//                                                 className="vehicle-image"
//                                                 onError={(e) => (e.target.src = '/placeholder.png')}
//                                             />
//                                         </p>
//                                     )}
//                                     <button onClick={() => handleEndRide(ride.id)}>End Ride</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : activeTab === 'requests' ? (
//                     <div className="requests-list">
//                         <h2>Ride Requests</h2>
//                         {rideRequests.length === 0 && !isLoading && <p className="no-data">No ride requests yet.</p>}
//                         <div className="ride-grid">
//                             {rideRequests.map((request) => (
//                                 <div key={request.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {request.ride?.pickupLocation || 'N/A'}</p>
//                                     <p><strong>To:</strong> {request.ride?.destination || 'N/A'}</p>
//                                     <p>
//                                         <strong>Date:</strong>{' '}
//                                         {request.ride?.startTime ? new Date(request.ride.startTime).toLocaleString() : 'N/A'}
//                                     </p>
//                                     <p><strong>Price:</strong> ₹{request.ride?.price || 'N/A'}</p>
//                                     <p><strong>Status:</strong> {request.status || 'N/A'}</p>
//                                     {request.status === 'PENDING' && request.passenger && (
//                                         <div className="passenger-details">
//                                             <h3>Passenger Profile</h3>
//                                             <button onClick={() => handleViewProfile(request.ride.id, request.passenger)}>
//                                                 View Passenger Profile
//                                             </button>
//                                             <button onClick={() => handleConfirmRequest(request.ride.id, request.id)}>
//                                                 Confirm Request
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="history-list">
//                         <h2>Ride History</h2>
//                         <button onClick={fetchRideHistory}>Refresh History</button>
//                         {history.length === 0 && !isLoading && <p className="no-data">No ride history yet.</p>}
//                         <div className="ride-grid">
//                             {history.map((entry) => (
//                                 <div key={entry.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {entry.ride?.pickupLocation || 'N/A'}</p>
//                                     <p><strong>To:</strong> {entry.ride?.destination || 'N/A'}</p>
//                                     <p><strong>Date:</strong> {entry.ride?.startTime ? new Date(entry.ride.startTime).toLocaleString() : 'N/A'}</p>
//                                     <p><strong>Price:</strong> ₹{entry.ride?.price || 'N/A'}</p>
//                                     {entry.ride?.vehicleImage && (
//                                         <p>
//                                             <strong>Vehicle:</strong>
//                                             <img
//                                                 src={`http://localhost:9010/${entry.ride.vehicleImage}`}
//                                                 alt="Vehicle"
//                                                 className="vehicle-image"
//                                                 onError={(e) => (e.target.src = '/placeholder.png')}
//                                             />
//                                         </p>
//                                     )}
//                                     <h3>Passenger</h3>
//                                     <p><strong>Name:</strong> {entry.passenger?.fullname || 'Unknown'}</p>
//                                     <p><strong>Email:</strong> {entry.passenger?.email || 'Unknown'}</p>
//                                     <p><strong>Phone:</strong> {entry.passenger?.phno || 'Not provided'}</p>
//                                     <p>
//                                         <strong>Completed:</strong>{' '}
//                                         {entry.completedAt ? new Date(entry.completedAt).toLocaleString() : 'N/A'}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default RiderDashboard;

//chekpoint1

function RiderDashboard() {
    const [myRides, setMyRides] = useState([]);
    const [rideRequests, setRideRequests] = useState([]);
    const [history, setHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('my-rides');
    const [isLoading, setIsLoading] = useState(false);
    const [riderId, setRiderId] = useState(localStorage.getItem('userId'));
    const [rideForm, setRideForm] = useState({
        pickupLocation: '',
        destination: '',
        startTime: '',
        price: '',
        seatsAvailable: '',
        vehicleImage: null
    });
    const navigate = useNavigate();

    // Validate current user
    const fetchCurrentUser = async () => {
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');
        if (!userId || !userRole) {
            setErrorMessage('Please log in to access the dashboard.');
            navigate('/');
            return;
        }
        if (userRole !== 'RIDER') {
            setErrorMessage('Access denied. Only riders can access this dashboard.');
            localStorage.clear();
            navigate('/');
            return;
        }
        try {
            const response = await axios.get('http://localhost:9010/api/users/profile', {
                params: { userId },
                withCredentials: true
            });
            console.log('User profile response:', response.data);
            setRiderId(userId);
        } catch (error) {
            console.error('Fetch user profile error:', error);
            setErrorMessage('Failed to fetch user profile. Please log in again.');
            localStorage.clear();
            navigate('/');
        }
    };

    // Fetch rider's posted rides
    const fetchMyRides = async (retryCount = 3, delay = 1000) => {
        if (!riderId) {
            setErrorMessage('Please log in to access rides.');
            navigate('/');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:9010/api/rides/my-rides', {
                params: { riderId },
                withCredentials: true
            });
            console.log('My rides response:', response.data);
            const rides = Array.isArray(response.data) ? response.data : [];
            setMyRides(rides);
            setErrorMessage('');
        } catch (error) {
            console.error('Fetch my rides error:', error);
            let errorMsg = 'Failed to fetch your rides.';
            if (error.response) {
                errorMsg = typeof error.response.data === 'string' ? error.response.data : error.response.data?.message || `Server error: ${error.response.status}`;
                if (error.response.status === 400 && retryCount > 0) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return fetchMyRides(retryCount - 1, delay * 2);
                }
            } else if (error.request) {
                errorMsg = 'No response from server. Check backend on port 9010.';
            }
            setErrorMessage(errorMsg);
            setMyRides([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch ride requests for rider's rides
    const fetchRideRequests = async (retryCount = 3, delay = 1000) => {
        if (!riderId) {
            setErrorMessage('Please log in to access requests.');
            navigate('/');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:9010/api/ride-requests/rider-requests', {
                params: { riderId },
                withCredentials: true
            });
            console.log('Ride requests response:', response.data);
            const requests = Array.isArray(response.data) ? response.data : [];
            setRideRequests(requests);
            setErrorMessage('');
        } catch (error) {
            console.error('Fetch ride requests error:', error);
            let errorMsg = 'Failed to fetch ride requests.';
            if (error.response) {
                errorMsg = typeof error.response.data === 'string' ? error.response.data : error.response.data?.message || `Server error: ${error.response.status}`;
                if (error.response.status === 400 && retryCount > 0) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return fetchRideRequests(retryCount - 1, delay * 2);
                }
            } else if (error.request) {
                errorMsg = 'No response from server. Check backend on port 9010.';
            }
            setErrorMessage(errorMsg);
            setRideRequests([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch ride history
    const fetchRideHistory = async () => {
        if (!riderId) {
            setErrorMessage('Please log in to view history.');
            navigate('/');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:9010/api/rides/history', {
                params: { userId: riderId, role: 'RIDER' },
                withCredentials: true
            });
            console.log('Ride history response:', response.data);
            const history = Array.isArray(response.data) ? response.data : [];
            setHistory(history);
            setErrorMessage('');
        } catch (error) {
            console.error('Fetch history error:', error);
            let errorMsg = 'Failed to fetch ride history.';
            if (error.response) {
                errorMsg = typeof error.response.data === 'string' ? error.response.data : error.response.data?.message || `Server error: ${error.response.status}`;
            } else if (error.request) {
                errorMsg = 'No response from server. Check backend on port 9010.';
            }
            setErrorMessage(errorMsg);
            setHistory([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle ride form input changes
    const handleRideFormChange = (e) => {
        const { name, value, files } = e.target;
        setRideForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    // Validate and post a new ride
    const handlePostRide = async (e) => {
        e.preventDefault();
        if (!riderId) {
            setErrorMessage('Please log in to post a ride.');
            navigate('/');
            return;
        }
        const { pickupLocation, destination, startTime, price, seatsAvailable, vehicleImage } = rideForm;
        if (!pickupLocation || !destination || !startTime || !price || !seatsAvailable) {
            setErrorMessage('All fields except vehicle image are required.');
            return;
        }
        if (isNaN(price) || price <= 0) {
            setErrorMessage('Price must be a positive number.');
            return;
        }
        if (isNaN(seatsAvailable) || seatsAvailable <= 0) {
            setErrorMessage('Seats available must be a positive number.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('pickupLocation', pickupLocation);
            formData.append('destination', destination);
            formData.append('startTime', new Date(startTime).toISOString().slice(0, 19)); // Format as YYYY-MM-DDTHH:mm:ss
            formData.append('price', price);
            formData.append('seatsAvailable', seatsAvailable);
            formData.append('riderId', riderId);
            if (vehicleImage) {
                formData.append('vehicleImage', vehicleImage);
            }
            const response = await axios.post('http://localhost:9010/api/rides/post', formData, {
                withCredentials: true
            });
            console.log('Post ride response:', response.data);
            setSuccessMessage('Ride posted successfully!');
            setRideForm({
                pickupLocation: '',
                destination: '',
                startTime: '',
                price: '',
                seatsAvailable: '',
                vehicleImage: null
            });
            document.getElementById('vehicleImage').value = '';
            fetchMyRides();
        } catch (error) {
            console.error('Post ride error:', error);
            let errorMsg = 'Failed to post ride.';
            if (error.response) {
                errorMsg = typeof error.response.data === 'string' ? error.response.data : error.response.data?.message || `Server error: ${error.response.status}`;
            }
            setErrorMessage(errorMsg);
        }
    };

    // End a ride
    const handleEndRide = async (rideId) => {
        if (!riderId) {
            setErrorMessage('Please log in to end a ride.');
            navigate('/');
            return;
        }
        try {
            const response = await axios.post('http://localhost:9010/api/rides/end', null, {
                params: { rideId, riderId },
                withCredentials: true
            });
            console.log('End ride response:', response.data);
            setSuccessMessage('Ride ended successfully!');
            fetchMyRides();
            fetchRideHistory();
        } catch (error) {
            console.error('End ride error:', error);
            let errorMsg = 'Failed to end ride.';
            if (error.response) {
                errorMsg = typeof error.response.data === 'string' ? error.response.data : error.response.data?.message || `Server error: ${error.response.status}`;
            }
            setErrorMessage(errorMsg);
        }
    };

    // Confirm a ride request
    const handleConfirmRequest = async (rideId, requestId) => {
        if (!riderId) {
            setErrorMessage('Please log in to confirm requests.');
            navigate('/');
            return;
        }
        try {
            const response = await axios.post('http://localhost:9010/api/ride-requests/confirm', {
                rideId,
                requestId,
                riderId
            }, {
                withCredentials: true
            });
            console.log('Confirm request response:', response.data);
            setSuccessMessage('Request confirmed successfully!');
            fetchRideRequests();
            fetchMyRides();
        } catch (error) {
            console.error('Confirm request error:', error);
            let errorMsg = 'Failed to confirm request.';
            if (error.response) {
                errorMsg = typeof error.response.data === 'string' ? error.response.data : error.response.data?.message || `Server error: ${error.response.status}`;
            }
            setErrorMessage(errorMsg);
        }
    };

    // Reject a ride request
    const handleRejectRequest = async (rideId, requestId) => {
        if (!riderId) {
            setErrorMessage('Please log in to reject requests.');
            navigate('/');
            return;
        }
        try {
            const response = await axios.post('http://localhost:9010/api/ride-requests/reject', {
                rideId,
                requestId,
                riderId
            }, {
                withCredentials: true
            });
            console.log('Reject request response:', response.data);
            setSuccessMessage('Request rejected successfully!');
            fetchRideRequests();
            fetchMyRides();
        } catch (error) {
            console.error('Reject request error:', error);
            let errorMsg = 'Failed to reject request.';
            if (error.response) {
                errorMsg = typeof error.response.data === 'string' ? error.response.data : error.response.data?.message || `Server error: ${error.response.status}`;
            }
            setErrorMessage(errorMsg);
        }
    };

    // View passenger profile
    const handleViewProfile = async (rideId, passenger) => {
        if (!riderId) {
            setErrorMessage('Please log in to view profiles.');
            navigate('/');
            return;
        }
        try {
            const response = await axios.get('http://localhost:9010/api/ride-requests/confirmed-profiles', {
                params: { rideId, userId: riderId },
                withCredentials: true
            });
            console.log('Confirmed passenger profile:', response.data);
            const profile = response.data[0] || {
                id: passenger.id,
                fullname: passenger.fullname || 'Unknown',
                email: passenger.email || 'Unknown',
                phno: passenger.phno || 'Not provided'
            };
            setSelectedProfile({
                role: 'PASSENGER',
                user: {
                    id: profile.id,
                    fullname: profile.fullname,
                    email: profile.email,
                    phno: profile.phno
                }
            });
        } catch (error) {
            console.error('Fetch passenger profile error:', error);
            let errorMsg = 'Failed to fetch passenger profile.';
            if (error.response) {
                errorMsg = typeof error.response.data === 'string' ? error.response.data : error.response.data?.message || `Server error: ${error.response.status}`;
            }
            setErrorMessage(errorMsg);
            setSelectedProfile({
                role: 'PASSENGER',
                user: {
                    id: passenger.id,
                    fullname: passenger.fullname || 'Unknown',
                    email: passenger.email || 'Unknown',
                    phno: passenger.phno || 'Not provided'
                }
            });
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const closeProfileDialog = () => {
        setSelectedProfile(null);
    };

    // Fetch user on mount
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    // Fetch data based on active tab
    useEffect(() => {
        if (riderId) {
            if (activeTab === 'my-rides') {
                fetchMyRides();
            } else if (activeTab === 'requests') {
                fetchRideRequests();
            } else if (activeTab === 'history') {
                fetchRideHistory();
            }
        }
    }, [activeTab, riderId]);

    return (
        <div className="rider-dashboard">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="/projectlogo.png" alt="RideEasy Logo" />
                    <span>RideEasy</span>
                </div>
                <div className="navbar-links">
                    <button onClick={() => setActiveTab('my-rides')} className={activeTab === 'my-rides' ? 'active' : ''}>
                        My Rides
                    </button>
                    <button onClick={() => setActiveTab('requests')} className={activeTab === 'requests' ? 'active' : ''}>
                        Ride Requests
                    </button>
                    <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
                        History
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                    <img src="/user.png" alt="Profile" onClick={() => setShowProfile(true)} />
                </div>
            </nav>
            {showProfile && (
                <ProfileDialog onClose={() => setShowProfile(false)} role="RIDER" />
            )}
            {selectedProfile && (
                <ProfileDialog
                    onClose={closeProfileDialog}
                    role={selectedProfile.role}
                    user={selectedProfile.user}
                />
            )}
            <div className="dashboard-content">
                <h1>Rider Dashboard</h1>
                {errorMessage && (
                    <div className="error-message shake">
                        {errorMessage}
                        <button
                            onClick={() => {
                                if (activeTab === 'my-rides') fetchMyRides();
                                else if (activeTab === 'requests') fetchRideRequests();
                                else fetchRideHistory();
                            }}
                        >
                            Retry
                        </button>
                    </div>
                )}
                {successMessage && <div className="success-message green-tick">{successMessage}</div>}
                {isLoading && <p>Loading...</p>}
                {activeTab === 'my-rides' ? (
                    <div className="rides-list">
                        <h2>My Rides</h2>
                        <div className="post-ride-form">
                            <h3>Post a New Ride</h3>
                            <form onSubmit={handlePostRide}>
                                <label htmlFor="pickupLocation">Pickup Location*</label>
                                <input
                                    type="text"
                                    id="pickupLocation"
                                    name="pickupLocation"
                                    value={rideForm.pickupLocation}
                                    onChange={handleRideFormChange}
                                    placeholder="Enter pickup location"
                                />
                                <label htmlFor="destination">Destination*</label>
                                <input
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    value={rideForm.destination}
                                    onChange={handleRideFormChange}
                                    placeholder="Enter destination"
                                />
                                <label htmlFor="startTime">Start Time*</label>
                                <input
                                    type="datetime-local"
                                    id="startTime"
                                    name="startTime"
                                    value={rideForm.startTime}
                                    onChange={handleRideFormChange}
                                />
                                <label htmlFor="price">Price (₹)*</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={rideForm.price}
                                    onChange={handleRideFormChange}
                                    placeholder="Enter price"
                                    min="1"
                                />
                                <label htmlFor="seatsAvailable">Seats Available*</label>
                                <input
                                    type="number"
                                    id="seatsAvailable"
                                    name="seatsAvailable"
                                    value={rideForm.seatsAvailable}
                                    onChange={handleRideFormChange}
                                    placeholder="Enter number of seats"
                                    min="1"
                                />
                                <label htmlFor="vehicleImage">Vehicle Image (Optional)</label>
                                <input
                                    type="file"
                                    id="vehicleImage"
                                    name="vehicleImage"
                                    accept="image/*"
                                    onChange={handleRideFormChange}
                                />
                                <button type="submit">Post Ride</button>
                            </form>
                        </div>
                        {myRides.length === 0 && !isLoading && <p className="no-data">No rides posted yet.</p>}
                        <div className="ride-grid">
                            {myRides.map((ride) => (
                                <div key={ride.id} className="ride-card">
                                    <h3>Ride Details</h3>
                                    <p><strong>From:</strong> {ride.pickupLocation || 'N/A'}</p>
                                    <p><strong>To:</strong> {ride.destination || 'N/A'}</p>
                                    <p><strong>Date:</strong> {ride.startTime ? new Date(ride.startTime).toLocaleString() : 'N/A'}</p>
                                    <p><strong>Price:</strong> ₹{ride.price || 'N/A'}</p>
                                    <p><strong>Seats:</strong> {ride.seatsAvailable || 'N/A'}</p>
                                    {ride.vehicleImage && (
                                        <p>
                                            <strong>Vehicle:</strong>
                                            <img
                                                src={`http://localhost:9010/${ride.vehicleImage}`}
                                                alt="Vehicle"
                                                className="vehicle-image"
                                                onError={(e) => (e.target.src = '/placeholder.png')}
                                            />
                                        </p>
                                    )}
                                    <button onClick={() => handleEndRide(ride.id)}>End Ride</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'requests' ? (
                    <div className="requests-list">
                        <h2>Ride Requests</h2>
                        {rideRequests.length === 0 && !isLoading && <p className="no-data">No ride requests yet.</p>}
                        <div className="ride-grid">
                            {rideRequests.map((request) => (
                                <div key={request.id} className="ride-card">
                                    <h3>Ride Details</h3>
                                    <p><strong>From:</strong> {request.ride?.pickupLocation || 'N/A'}</p>
                                    <p><strong>To:</strong> {request.ride?.destination || 'N/A'}</p>
                                    <p>
                                        <strong>Date:</strong>{' '}
                                        {request.ride?.startTime ? new Date(request.ride.startTime).toLocaleString() : 'N/A'}
                                    </p>
                                    <p><strong>Price:</strong> ₹{request.ride?.price || 'N/A'}</p>
                                    <p><strong>Status:</strong> {request.status || 'N/A'}</p>
                                    {request.status === 'PENDING' && request.passenger && (
                                        <div className="passenger-details">
                                            <h3>Passenger Profile</h3>
                                            <button onClick={() => handleViewProfile(request.ride.id, request.passenger)}>
                                                View Passenger Profile
                                            </button>
                                            <button onClick={() => handleConfirmRequest(request.ride.id, request.id)}>
                                                Confirm Request
                                            </button>
                                            <button onClick={() => handleRejectRequest(request.ride.id, request.id)}>
                                                Reject Request
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="history-list">
                        <h2>Ride History</h2>
                        <button onClick={fetchRideHistory}>Refresh History</button>
                        {history.length === 0 && !isLoading && <p className="no-data">No ride history yet.</p>}
                        <div className="ride-grid">
                            {history.map((entry) => (
                                <div key={entry.id} className="ride-card">
                                    <h3>Ride Details</h3>
                                    <p><strong>From:</strong> {entry.ride?.pickupLocation || 'N/A'}</p>
                                    <p><strong>To:</strong> {entry.ride?.destination || 'N/A'}</p>
                                    <p><strong>Date:</strong> {entry.ride?.startTime ? new Date(entry.ride.startTime).toLocaleString() : 'N/A'}</p>
                                    <p><strong>Price:</strong> ₹{entry.ride?.price || 'N/A'}</p>
                                    {entry.ride?.vehicleImage && (
                                        <p>
                                            <strong>Vehicle:</strong>
                                            <img
                                                src={`http://localhost:9010/${entry.ride.vehicleImage}`}
                                                alt="Vehicle"
                                                className="vehicle-image"
                                                onError={(e) => (e.target.src = '/placeholder.png')}
                                            />
                                        </p>
                                    )}
                                    <h3>Passenger</h3>
                                    <p><strong>Name:</strong> {entry.passenger?.fullname || 'Unknown'}</p>
                                    <p><strong>Email:</strong> {entry.passenger?.email || 'Unknown'}</p>
                                    <p><strong>Phone:</strong> {entry.passenger?.phno || 'Not provided'}</p>
                                    <p>
                                        <strong>Completed:</strong>{' '}
                                        {entry.completedAt ? new Date(entry.completedAt).toLocaleString() : 'N/A'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RiderDashboard;