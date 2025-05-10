// // // // // const [showProfile, setShowProfile] = useState(false);
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import ProfileDialog from './ProfileDialog';
// // // // // import '../styles/PassengerDashboard.css';
// // // // // import '../styles/animations.css';

// // // // // function PassengerDashboard() {
// // // // //   const [rides, setRides] = useState([]);
// // // // //   const [myRides, setMyRides] = useState([]);
// // // // //   const [errorMessage, setErrorMessage] = useState('');
// // // // //   const [successMessage, setSuccessMessage] = useState('');

// // // // //   useEffect(() => {
// // // // //     fetchAvailableRides();
// // // // //     fetchMyRides();
// // // // //   }, []);

// // // // //   const fetchAvailableRides = async () => {
// // // // //     try {
// // // // //       const response = await axios.get('http://localhost:9010/api/rides/available');
// // // // //       setRides(response.data);
// // // // //     } catch (error) {
// // // // //       setErrorMessage('Failed to fetch rides.');
// // // // //     }
// // // // //   };

// // // // //   const fetchMyRides = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem('authToken');
// // // // //       const response = await axios.get('http://localhost:9010/api/ride-requests/my-requests', {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       });
// // // // //       setMyRides(response.data);
// // // // //     } catch (error) {
// // // // //       setErrorMessage('Failed to fetch your rides.');
// // // // //     }
// // // // //   };

// // // // //   const handleRequestRide = async (rideId) => {
// // // // //     try {
// // // // //       const token = localStorage.getItem('authToken');
// // // // //       await axios.post(
// // // // //         'http://localhost:9010/api/ride-requests/request',
// // // // //         { rideId },
// // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // //       );
// // // // //       setSuccessMessage('Ride requested successfully!');
// // // // //       fetchMyRides();
// // // // //     } catch (error) {
// // // // //       setErrorMessage(error.response?.data?.message || 'Failed to request ride.');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="passenger-dashboard">
// // // // //       <nav className="navbar">
// // // // //         <div className="navbar-logo">
// // // // //           <img src="/projectlogo.png" alt="RideEasy Logo" />
// // // // //           <span>RideEasy</span>
// // // // //         </div>
// // // // //         <div className="navbar-profile">
// // // // //           <img
// // // // //             src="/user.png"
// // // // //             alt="Profile"
// // // // //             onClick={() => setShowProfile(true)}
// // // // //           />
// // // // //         </div>
// // // // //       </nav>
// // // // //       {showProfile && (
// // // // //         <ProfileDialog
// // // // //           onClose={() => setShowProfile(false)}
// // // // //           role="PASSENGER"
// // // // //         />
// // // // //       )}
// // // // //       <div className="dashboard-content">
// // // // //         <h1>Passenger Dashboard</h1>
// // // // //         {errorMessage && <div className="error-message shake">{errorMessage}</div>}
// // // // //         {successMessage && (
// // // // //           <div className="success-message green-tick">{successMessage}</div>
// // // // //         )}
// // // // //         <div className="rides-list">
// // // // //           <h2>Available Rides</h2>
// // // // //           {rides.map((ride) => (
// // // // //             <div key={ride.id} className="ride-card">
// // // // //               <p>From: {ride.pickupLocation}</p>
// // // // //               <p>To: {ride.destination}</p>
// // // // //               <p>Date: {new Date(ride.dateTime).toLocaleString()}</p>
// // // // //               <p>Price: ₹{ride.price}</p>
// // // // //               <p>Seats: {ride.seatsAvailable}</p>
// // // // //               <button onClick={() => handleRequestRide(ride.id)}>Request Ride</button>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //         <div className="my-rides">
// // // // //           <h2>Your Rides</h2>
// // // // //           {myRides.map((ride) => (
// // // // //             <div key={ride.id} className="ride-card">
// // // // //               <p>From: {ride.pickupLocation}</p>
// // // // //               <p>To: {ride.destination}</p>
// // // // //               <p>Date: {new Date(ride.dateTime).toLocaleString()}</p>
// // // // //               <p>Price: ₹{ride.price}</p>
// // // // //               <p>Status: {ride.status}</p>
// // // // //               {ride.status === 'CONFIRMED' && (
// // // // //                 <div className="rider-details">
// // // // //                   <h3>Rider Details</h3>
// // // // //                   <p>Name: {ride.rider.fullname}</p>
// // // // //                   <p>Email: {ride.rider.email}</p>
// // // // //                   <p>Phone: {ride.rider.phone}</p>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default PassengerDashboard;
// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import ProfileDialog from './ProfileDialog';
// // // // import '../styles/PassengerDashboard.css';
// // // // import '../styles/animations.css';

// // // // function PassengerDashboard() {
// // // //   const [rides, setRides] = useState([]);
// // // //   const [myRides, setMyRides] = useState([]);
// // // //   const [errorMessage, setErrorMessage] = useState('');
// // // //   const [successMessage, setSuccessMessage] = useState('');
// // // //   const [showProfile, setShowProfile] = useState(false); // Added state
// // // //   const [loading, setLoading] = useState(true); // Added loading state

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       await Promise.all([fetchAvailableRides(), fetchMyRides()]);
// // // //       setLoading(false); // Set loading to false after both API calls complete
// // // //     };
// // // //     fetchData();
// // // //   }, []);

// // // //   const fetchAvailableRides = async () => {
// // // //     try {
// // // //       const response = await axios.get('http://localhost:9010/api/rides/available');
// // // //       setRides(Array.isArray(response.data) ? response.data : []); // Ensure array
// // // //     } catch (error) {
// // // //       setErrorMessage('Failed to fetch rides.');
// // // //     }
// // // //   };

// // // //   const fetchMyRides = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem('authToken');
// // // //       const response = await axios.get('http://localhost:9010/api/ride-requests/my-requests', {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });
// // // //       setMyRides(Array.isArray(response.data) ? response.data : []); // Ensure array
// // // //     } catch (error) {
// // // //       setErrorMessage('Failed to fetch your rides.');
// // // //     }
// // // //   };

// // // //   const handleRequestRide = async (rideId) => {
// // // //     try {
// // // //       const token = localStorage.getItem('authToken');
// // // //       await axios.post(
// // // //         'http://localhost:9010/api/ride-requests/request',
// // // //         { rideId },
// // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // //       );
// // // //       setSuccessMessage('Ride requested successfully!');
// // // //       fetchMyRides(); // Refresh my rides
// // // //     } catch (error) {
// // // //       setErrorMessage(error.response?.data?.message || 'Failed to request ride.');
// // // //     }
// // // //   };

// // // //   // Handle loading state
// // // //   if (loading) {
// // // //     return <div className="passenger-dashboard">Loading rides...</div>;
// // // //   }

// // // //   return (
// // // //     <div className="passenger-dashboard">
// // // //       <nav className="navbar">
// // // //         <div className="navbar-logo">
// // // //           <img src="/projectlogo.png" alt="RideEasy Logo" />
// // // //           <span>RideEasy</span>
// // // //         </div>
// // // //         <div className="navbar-profile">
// // // //           <img
// // // //             src="/user.png"
// // // //             alt="Profile"
// // // //             onClick={() => setShowProfile(true)}
// // // //           />
// // // //         </div>
// // // //       </nav>
// // // //       {showProfile && (
// // // //         <ProfileDialog
// // // //           onClose={() => setShowProfile(false)}
// // // //           role="PASSENGER"
// // // //         />
// // // //       )}
// // // //       <div className="dashboard-content">
// // // //         <h1>Passenger Dashboard</h1>
// // // //         {errorMessage && <div className="error-message shake">{errorMessage}</div>}
// // // //         {successMessage && (
// // // //           <div className="success-message green-tick">{successMessage}</div>
// // // //         )}
// // // //         <div className="rides-list">
// // // //           <h2>Available Rides</h2>
// // // //           {rides.length === 0 ? (
// // // //             <p>No rides available at the moment. Check back later!</p>
// // // //           ) : (
// // // //             rides.map((ride) => (
// // // //               <div key={ride.id} className="ride-card">
// // // //                 <p>From: {ride.pickupLocation}</p>
// // // //                 <p>To: {ride.destination}</p>
// // // //                 <p>Date: {new Date(ride.dateTime).toLocaleString()}</p>
// // // //                 <p>Price: ₹{ride.price}</p>
// // // //                 <p>Seats: {ride.seatsAvailable}</p>
// // // //                 <button onClick={() => handleRequestRide(ride.id)}>Request Ride</button>
// // // //               </div>
// // // //             ))
// // // //           )}
// // // //         </div>
// // // //         <div className="my-rides">
// // // //           <h2>Your Rides</h2>
// // // //           {myRides.length === 0 ? (
// // // //             <p>You haven't requested any rides yet.</p>
// // // //           ) : (
// // // //             myRides.map((ride) => (
// // // //               <div key={ride.id} className="ride-card">
// // // //                 <p>From: {ride.pickupLocation}</p>
// // // //                 <p>To: {ride.destination}</p>
// // // //                 <p>Date: {new Date(ride.dateTime).toLocaleString()}</p>
// // // //                 <p>Price: ₹{ride.price}</p>
// // // //                 <p>Status: {ride.status}</p>
// // // //                 {ride.status === 'CONFIRMED' && (
// // // //                   <div className="rider-details">
// // // //                     <h3>Rider Details</h3>
// // // //                     <p>Name: {ride.rider?.fullname || 'N/A'}</p>
// // // //                     <p>Email: {ride.rider?.email || 'N/A'}</p>
// // // //                     <p>Phone: {ride.rider?.phone || 'N/A'}</p>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             ))
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default PassengerDashboard;




// // // import axios from 'axios';
// // // import { useState, useEffect } from 'react';

// // // function PassengerDashboard() {
// // //     const [myRides, setMyRides] = useState([]);
// // //     const [errorMessage, setErrorMessage] = useState('');
// // //     const [loading, setLoading] = useState(true);

// // //     useEffect(() => {
// // //         fetchMyRides();
// // //     }, []);

// // //     const fetchMyRides = async () => {
// // //         try {
// // //             const userId = localStorage.getItem('userId');
// // //             if (!userId) {
// // //                 setErrorMessage('Please log in again.');
// // //                 setLoading(false);
// // //                 return;
// // //             }
// // //             const response = await axios.get('http://localhost:9010/api/ride-requests/my-requests', {
// // //                 headers: { 'X-User-Id': userId },
// // //             });
// // //             setMyRides(Array.isArray(response.data) ? response.data : []);
// // //         } catch (error) {
// // //             console.error('Error fetching my rides:', error);
// // //             setErrorMessage(
// // //                 error.response?.data?.message || 'Failed to fetch your rides. Please try again.'
// // //             );
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <h1>Passenger Dashboard</h1>
// // //             {errorMessage && <div className="error-message">{errorMessage}</div>}
// // //             {loading ? (
// // //                 <div>Loading...</div>
// // //             ) : (
// // //                 <div>
// // //                     {myRides.length === 0 ? (
// // //                         <p>You haven't requested any rides yet.</p>
// // //                     ) : (
// // //                         <ul>
// // //                             {myRides.map((ride) => (
// // //                                 <li key={ride.id}>{ride.details}</li>
// // //                             ))}
// // //                         </ul>
// // //                     )}
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }

// // // export default PassengerDashboard;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import ProfileDialog from './ProfileDialog';
// // import '../styles/PassengerDashboard.css';
// // import '../styles/animations.css';

// // function PassengerDashboard() {
// //     const [rides, setRides] = useState([]);
// //     const [requests, setRequests] = useState([]);
// //     const [history, setHistory] = useState([]);
// //     const [errorMessage, setErrorMessage] = useState('');
// //     const [successMessage, setSuccessMessage] = useState('');
// //     const [showProfile, setShowProfile] = useState(false);
// //     const [activeTab, setActiveTab] = useState('rides');
// //     const passengerId = localStorage.getItem('userId');

// //     useEffect(() => {
// //         if (activeTab === 'rides') {
// //             fetchRides();
// //             fetchRequests();
// //         } else {
// //             fetchHistory();
// //         }
// //     }, [activeTab]);

// //     const fetchRides = async () => {
// //         try {
// //             const response = await axios.get('http://localhost:9010/api/rides/available');
// //             setRides(response.data);
// //             setErrorMessage('');
// //         } catch (error) {
// //             setErrorMessage('Failed to fetch rides.');
// //         }
// //     };

// //     const fetchRequests = async () => {
// //         try {
// //             const response = await axios.get('http://localhost:9010/api/ride-requests/my-requests', {
// //                 params: { passengerId }
// //             });
// //             setRequests(response.data);
// //             setErrorMessage('');
// //         } catch (error) {
// //             setErrorMessage('Failed to fetch requests.');
// //         }
// //     };

// //     const fetchHistory = async () => {
// //         try {
// //             const response = await axios.get('http://localhost:9010/api/rides/history', {
// //                 params: { userId: passengerId, role: 'PASSENGER' }
// //             });
// //             setHistory(response.data);
// //             setErrorMessage('');
// //         } catch (error) {
// //             setErrorMessage('Failed to fetch history.');
// //         }
// //     };

// //     const handleBookRide = async (rideId) => {
// //         try {
// //             await axios.post('http://localhost:9010/api/ride-requests', {
// //                 rideId,
// //                 passengerId
// //             });
// //             setSuccessMessage('Ride requested successfully!');
// //             fetchRequests();
// //         } catch (error) {
// //             setErrorMessage(error.response?.data || 'Failed to request ride.');
// //         }
// //     };

// //     const hasConfirmedRequest = requests.some(req => req.status === 'CONFIRMED');

// //     return (
// //         <div className="passenger-dashboard">
// //             <nav className="navbar">
// //                 <div className="navbar-logo">
// //                     <img src="/projectlogo.png" alt="RideEasy Logo" />
// //                     <span>RideEasy</span>
// //                 </div>
// //                 <div className="navbar-links">
// //                     <button onClick={() => setActiveTab('rides')} className={activeTab === 'rides' ? 'active' : ''}>Rides</button>
// //                     <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>History</button>
// //                     <img src="/user.png" alt="Profile" onClick={() => setShowProfile(true)} />
// //                 </div>
// //             </nav>
// //             {showProfile && (
// //                 <ProfileDialog onClose={() => setShowProfile(false)} role="PASSENGER" />
// //             )}
// //             <div className="dashboard-content">
// //                 <h1>Passenger Dashboard</h1>
// //                 {errorMessage && <div className="error-message shake">{errorMessage}</div>}
// //                 {successMessage && <div className="success-message green-tick">{successMessage}</div>}
// //                 {activeTab === 'rides' ? (
// //                     <>
// //                         {!hasConfirmedRequest ? (
// //                             <div className="rides-list">
// //                                 <h2>Available Rides</h2>
// //                                 {rides.length === 0 && <p className="no-data">No bookings done yet.</p>}
// //                                 <div className="ride-grid">
// //                                     {rides.map((ride) => (
// //                                         <div key={ride.id} className="ride-card">
// //                                             <h3>Ride Details</h3>
// //                                             <p><strong>From:</strong> {ride.pickupLocation}</p>
// //                                             <p><strong>To:</strong> {ride.destination}</p>
// //                                             <p><strong>Date:</strong> {new Date(ride.startTime).toLocaleString()}</p>
// //                                             <p><strong>Price:</strong> ₹{ride.price}</p>
// //                                             <p><strong>Seats:</strong> {ride.seatsAvailable}</p>
// //                                             {ride.vehicleImage && (
// //                                                 <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${ride.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
// //                                             )}
// //                                             <p><strong>Rider:</strong> {ride.rider.fullname} ({ride.rider.email})</p>
// //                                             <button onClick={() => handleBookRide(ride.id)}>Book Ride</button>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         ) : (
// //                             <div className="confirmed-ride">
// //                                 <h2>Confirmed Ride</h2>
// //                                 {requests
// //                                     .filter((req) => req.status === 'CONFIRMED')
// //                                     .map((req) => (
// //                                         <div key={req.id} className="ride-card">
// //                                             <h3>Ride Details</h3>
// //                                             <p><strong>From:</strong> {req.ride.pickupLocation}</p>
// //                                             <p><strong>To:</strong> {req.ride.destination}</p>
// //                                             <p><strong>Date:</strong> {new Date(req.ride.startTime).toLocaleString()}</p>
// //                                             <p><strong>Price:</strong> ₹{req.ride.price}</p>
// //                                             {req.ride.vehicleImage && (
// //                                                 <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${req.ride.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
// //                                             )}
// //                                             <h3>Rider Details</h3>
// //                                             <p><strong>Name:</strong> {req.ride.rider.fullname}</p>
// //                                             <p><strong>Email:</strong> {req.ride.rider.email}</p>
// //                                             <p><strong>Phone:</strong> {req.ride.rider.phno}</p>
// //                                             <div className="on-journey slide-in">
// //                                                 <div className="green-line"></div>
// //                                                 <p>On journey...</p>
// //                                             </div>
// //                                         </div>
// //                                     ))}
// //                             </div>
// //                         )}
// //                     </>
// //                 ) : (
// //                     <div className="history-list">
// //                         <h2>Ride History</h2>
// //                         {history.length === 0 && <p className="no-data">No bookings done yet.</p>}
// //                         <div className="ride-grid">
// //                             {history.map((entry) => (
// //                                 <div key={entry.id} className="ride-card">
// //                                     <h3>Ride Details</h3>
// //                                     <p><strong>From:</strong> {entry.pickupLocation}</p>
// //                                     <p><strong>To:</strong> {entry.destination}</p>
// //                                     <p><strong>Date:</strong> {new Date(entry.startTime).toLocaleString()}</p>
// //                                     <p><strong>Price:</strong> ₹{entry.price}</p>
// //                                     {entry.vehicleImage && (
// //                                         <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${entry.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
// //                                     )}
// //                                     <h3>Rider</h3>
// //                                     <p><strong>Name:</strong> {entry.riderName}</p>
// //                                     <p><strong>Email:</strong> {entry.riderEmail}</p>
// //                                     <p><strong>Phone:</strong> {entry.riderPhone}</p>
// //                                     <p><strong>Completed:</strong> {new Date(entry.completedAt).toLocaleString()}</p>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }

// // export default PassengerDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProfileDialog from './ProfileDialog';
// import '../styles/PassengerDashboard.css';
// import '../styles/animations.css';

// function PassengerDashboard() {
//     const [availableRides, setAvailableRides] = useState([]);
//     const [myRequests, setMyRequests] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showProfile, setShowProfile] = useState(false);
//     const [activeTab, setActiveTab] = useState('available');
//     const passengerId = localStorage.getItem('userId');

//     useEffect(() => {
//         if (activeTab === 'available') {
//             fetchAvailableRides();
//         } else if (activeTab === 'requests') {
//             fetchMyRequests();
//         } else {
//             fetchHistory();
//         }
//     }, [activeTab]);

//     const fetchAvailableRides = async () => {
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/available', {
//                 withCredentials: true
//             });
//             setAvailableRides(response.data.filter(ride => ride.status === 'PENDING'));
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch available rides error:', error);
//             setErrorMessage('Failed to fetch available rides.');
//         }
//     };

//     const fetchMyRequests = async () => {
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides-requests/my-requests', {
//                 params: { passengerId },
//                 withCredentials: true
//             });
//             setMyRequests(response.data);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch my requests error:', error);
//             setErrorMessage('Failed to fetch your requests.');
//         }
//     };

//     const fetchHistory = async () => {
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/history', {
//                 params: { userId: passengerId, role: 'PASSENGER' },
//                 withCredentials: true
//             });
//             setHistory(response.data);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch history error:', error);
//             setErrorMessage('Failed to fetch history.');
//         }
//     };

//     const handleBookRide = async (rideId) => {
//         try {
//             const response = await axios.post('http://localhost:9010/api/ride-requests', {
//                 rideId,
//                 passengerId
//             }, {
//                 withCredentials: true
//             });
//             setSuccessMessage('Ride booked successfully! Waiting for rider confirmation.');
//             fetchAvailableRides();
//             fetchMyRequests();
//         } catch (error) {
//             console.error('Book ride error:', error);
//             setErrorMessage(error.response?.data || 'Failed to book ride.');
//         }
//     };

//     return (
//         <div className="passenger-dashboard">
//             <nav className="navbar">
//                 <div className="navbar-logo">
//                     <img src="/projectlogo.png" alt="RideEasy Logo" />
//                     <span>RideEasy</span>
//                 </div>
//                 <div className="navbar-links">
//                     <button onClick={() => setActiveTab('available')} className={activeTab === 'available' ? 'active' : ''}>Available Rides</button>
//                     <button onClick={() => setActiveTab('requests')} className={activeTab === 'requests' ? 'active' : ''}>My Requests</button>
//                     <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>History</button>
//                     <img src="/user.png" alt="Profile" onClick={() => setShowProfile(true)} />
//                 </div>
//             </nav>
//             {showProfile && (
//                 <ProfileDialog onClose={() => setShowProfile(false)} role="PASSENGER" />
//             )}
//             <div className="dashboard-content">
//                 <h1>Passenger Dashboard</h1>
//                 {errorMessage && <div className="error-message shake">{errorMessage}</div>}
//                 {successMessage && <div className="success-message green-tick">{successMessage}</div>}
//                 {activeTab === 'available' ? (
//                     <div className="rides-list">
//                         <h2>Available Rides</h2>
//                         {availableRides.length === 0 && <p className="no-data">No rides available.</p>}
//                         <div className="ride-grid">
//                             {availableRides.map((ride) => (
//                                 <div key={ride.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {ride.pickupLocation}</p>
//                                     <p><strong>To:</strong> {ride.destination}</p>
//                                     <p><strong>Date:</strong> {new Date(ride.startTime).toLocaleString()}</p>
//                                     <p><strong>Price:</strong> ₹{ride.price}</p>
//                                     <p><strong>Seats:</strong> {ride.seatsAvailable}</p>
//                                     <p><strong>Rider:</strong> {ride.rider?.fullname}</p>
//                                     {ride.vehicleImage && (
//                                         <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${ride.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
//                                     )}
//                                     <button onClick={() => handleBookRide(ride.id)}>Accept Ride</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : activeTab === 'requests' ? (
//                     <div className="requests-list">
//                         <h2>Your Ride Requests</h2>
//                         {myRequests.length === 0 && <p className="no-data">No ride requests yet.</p>}
//                         <div className="ride-grid">
//                             {myRequests.map((request) => (
//                                 <div key={request.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {request.ride?.pickupLocation}</p>
//                                     <p><strong>To:</strong> {request.ride?.destination}</p>
//                                     <p><strong>Date:</strong> {request.ride ? new Date(request.ride.startTime).toLocaleString() : 'N/A'}</p>
//                                     <p><strong>Price:</strong> ₹{request.ride?.price}</p>
//                                     <p><strong>Status:</strong> {request.status}</p>
//                                     {request.status === 'CONFIRMED' && request.ride?.rider && (
//                                         <div className="rider-details">
//                                             <h3>Rider Profile</h3>
//                                             <p><strong>Name:</strong> {request.ride.rider.fullname}</p>
//                                             <p><strong>Email:</strong> {request.ride.rider.email}</p>
//                                             <p><strong>Phone:</strong> {request.ride.rider.phno || 'Not provided'}</p>
//                                             <div className="on-journey slide-in">
//                                                 <div className="green-line"></div>
//                                                 <p>Confirmed - On journey...</p>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="history-list">
//                         <h2>Ride History</h2>
//                         {history.length === 0 && <p className="no-data">No ride history yet.</p>}
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
//                                     <h3>Rider</h3>
//                                     <p><strong>Name:</strong> {entry.riderName}</p>
//                                     <p><strong>Email:</strong> {entry.riderEmail}</p>
//                                     <p><strong>Phone:</strong> {entry.riderPhone || 'Not provided'}</p>
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

// export default PassengerDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProfileDialog from './ProfileDialog';
// import '../styles/PassengerDashboard.css';
// import '../styles/animations.css';

// function PassengerDashboard() {
//     const [availableRides, setAvailableRides] = useState([]);
//     const [myRequests, setMyRequests] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showProfile, setShowProfile] = useState(false);
//     const [activeTab, setActiveTab] = useState('available');
//     const passengerId = localStorage.getItem('userId');

//     useEffect(() => {
//         if (activeTab === 'available') {
//             fetchAvailableRides();
//         } else if (activeTab === 'requests') {
//             fetchMyRequests();
//         } else {
//             fetchHistory();
//         }
//     }, [activeTab]);

//     const fetchAvailableRides = async () => {
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/available', {
//                 withCredentials: true
//             });
//             setAvailableRides(response.data.filter(ride => ride.status === 'PENDING'));
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch available rides error:', error);
//             setErrorMessage('Failed to fetch available rides.');
//         }
//     };

//     const fetchMyRequests = async () => {
//         try {
//             const response = await axios.get('http://localhost:9010/api/ride-requests/my-requests', {
//                 params: { passengerId },
//                 withCredentials: true
//             });
//             setMyRequests(response.data);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch my requests error:', error);
//             setErrorMessage('Failed to fetch your requests.');
//         }
//     };

//     const fetchHistory = async () => {
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/history', {
//                 params: { userId: passengerId, role: 'PASSENGER' },
//                 withCredentials: true
//             });
//             setHistory(response.data);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch history error:', error);
//             setErrorMessage('Failed to fetch history.');
//         }
//     };

//     const handleBookRide = async (rideId) => {
//         try {
//             const response = await axios.post('http://localhost:9010/api/ride-requests', {
//                 rideId,
//                 passengerId
//             }, {
//                 withCredentials: true
//             });
//             setSuccessMessage('Ride booked successfully! Waiting for rider confirmation.');
//             fetchAvailableRides();
//             fetchMyRequests();
//         } catch (error) {
//             console.error('Book ride error:', error);
//             setErrorMessage(error.response?.data || 'Failed to book ride.');
//         }
//     };

//     return (
//         <div className="passenger-dashboard">
//             <nav className="navbar">
//                 <div className="navbar-logo">
//                     <img src="/projectlogo.png" alt="RideEasy Logo" />
//                     <span>RideEasy</span>
//                 </div>
//                 <div className="navbar-links">
//                     <button onClick={() => setActiveTab('available')} className={activeTab === 'available' ? 'active' : ''}>Available Rides</button>
//                     <button onClick={() => setActiveTab('requests')} className={activeTab === 'requests' ? 'active' : ''}>My Requests</button>
//                     <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>History</button>
//                     <img src="/user.png" alt="Profile" onClick={() => setShowProfile(true)} />
//                 </div>
//             </nav>
//             {showProfile && (
//                 <ProfileDialog onClose={() => setShowProfile(false)} role="PASSENGER" />
//             )}
//             <div className="dashboard-content">
//                 <h1>Passenger Dashboard</h1>
//                 {errorMessage && <div className="error-message shake">{errorMessage}</div>}
//                 {successMessage && <div className="success-message green-tick">{successMessage}</div>}
//                 {activeTab === 'available' ? (
//                     <div className="rides-list">
//                         <h2>Available Rides</h2>
//                         {availableRides.length === 0 && <p className="no-data">No rides available.</p>}
//                         <div className="ride-grid">
//                             {availableRides.map((ride) => (
//                                 <div key={ride.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {ride.pickupLocation}</p>
//                                     <p><strong>To:</strong> {ride.destination}</p>
//                                     <p><strong>Date:</strong> {new Date(ride.startTime).toLocaleString()}</p>
//                                     <p><strong>Price:</strong> ₹{ride.price}</p>
//                                     <p><strong>Seats:</strong> {ride.seatsAvailable}</p>
//                                     <p><strong>Rider:</strong> {ride.rider?.fullname}</p>
//                                     {ride.vehicleImage && (
//                                         <p><strong>Vehicle:</strong> <img src={`http://localhost:9010/${ride.vehicleImage}`} alt="Vehicle" className="vehicle-image" /></p>
//                                     )}
//                                     <button onClick={() => handleBookRide(ride.id)}>Accept Ride</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : activeTab === 'requests' ? (
//                     <div className="requests-list">
//                         <h2>Your Ride Requests</h2>
//                         {myRequests.length === 0 && <p className="no-data">No ride requests yet.</p>}
//                         <div className="ride-grid">
//                             {myRequests.map((request) => (
//                                 <div key={request.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {request.ride?.pickupLocation}</p>
//                                     <p><strong>To:</strong> {request.ride?.destination}</p>
//                                     <p><strong>Date:</strong> {request.ride ? new Date(request.ride.startTime).toLocaleString() : 'N/A'}</p>
//                                     <p><strong>Price:</strong> ₹{request.ride?.price}</p>
//                                     <p><strong>Status:</strong> {request.status}</p>
//                                     {request.status === 'CONFIRMED' && request.ride?.rider && (
//                                         <div className="rider-details">
//                                             <h3>Rider Profile</h3>
//                                             <p><strong>Name:</strong> {request.ride.rider.fullname}</p>
//                                             <p><strong>Email:</strong> {request.ride.rider.email}</p>
//                                             <p><strong>Phone:</strong> {request.ride.rider.phno || 'Not provided'}</p>
//                                             <div className="on-journey slide-in">
//                                                 <div className="green-line"></div>
//                                                 <p>Confirmed - On journey...</p>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="history-list">
//                         <h2>Ride History</h2>
//                         {history.length === 0 && <p className="no-data">No ride history yet.</p>}
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
//                                     <h3>Rider</h3>
//                                     <p><strong>Name:</strong> {entry.riderName}</p>
//                                     <p><strong>Email:</strong> {entry.riderEmail}</p>
//                                     <p><strong>Phone:</strong> {entry.riderPhone || 'Not provided'}</p>
//                                     <p><strong>Completed:</strong> {entry.completedAt ? new Date(entry.completedAt).toLocaleString() : 'N/A'}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default PassengerDashboard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProfileDialog from './ProfileDialog';
// import '../styles/PassengerDashboard.css';
// import '../styles/animations.css';

// function PassengerDashboard() {
//     const [availableRides, setAvailableRides] = useState([]);
//     const [myRequests, setMyRequests] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showProfile, setShowProfile] = useState(false);
//     const [selectedProfile, setSelectedProfile] = useState(null);
//     const [activeTab, setActiveTab] = useState('available');
//     const [isLoading, setIsLoading] = useState(false);
//     const passengerId = localStorage.getItem('userId');

//     useEffect(() => {
//         if (activeTab === 'available') {
//             fetchAvailableRides();
//         } else if (activeTab === 'requests') {
//             fetchMyRequests();
//         } else {
//             fetchHistory();
//         }
//     }, [activeTab]);

//     const fetchAvailableRides = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/available', {
//                 withCredentials: true
//             });
//             console.log('Available rides response:', response.data);
//             const rides = Array.isArray(response.data) ? response.data : [];
//             setAvailableRides(rides.filter(ride => ride.status === 'PENDING'));
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch available rides error:', error);
//             let errorMsg = 'Failed to fetch available rides. Please try again.';
//             if (error.response) {
//                 errorMsg = error.response.data || `Server error: ${error.response.status}`;
//             } else if (error.request) {
//                 errorMsg = 'No response from server. Please check if the backend is running.';
//             }
//             setErrorMessage(errorMsg);
//             setAvailableRides([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const fetchMyRequests = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get('http://localhost:9010/api/ride-requests/my-requests', {
//                 params: { passengerId },
//                 withCredentials: true
//             });
//             setMyRequests(Array.isArray(response.data) ? response.data : []);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch my requests error:', error);
//             let errorMsg = 'Failed to fetch your requests.';
//             if (error.response) {
//                 errorMsg = error.response.data || `Server error: ${error.response.status}`;
//             }
//             setErrorMessage(errorMsg);
//             setMyRequests([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const fetchHistory = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/history', {
//                 params: { userId: passengerId, role: 'PASSENGER' },
//                 withCredentials: true
//             });
//             setHistory(Array.isArray(response.data) ? response.data : []);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch history error:', error);
//             let errorMsg = 'Failed to fetch history.';
//             if (error.response) {
//                 errorMsg = error.response.data || `Server error: ${error.response.status}`;
//             }
//             setErrorMessage(errorMsg);
//             setHistory([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleBookRide = async (rideId) => {
//         try {
//             await axios.post('http://localhost:9010/api/ride-requests', {
//                 rideId,
//                 passengerId
//             }, {
//                 withCredentials: true
//             });
//             setSuccessMessage('Ride booked successfully! Waiting for rider confirmation.');
//             fetchAvailableRides();
//             fetchMyRequests();
//         } catch (error) {
//             console.error('Book ride error:', error);
//             let errorMsg = error.response?.data || 'Failed to book ride.';
//             setErrorMessage(errorMsg);
//         }
//     };

//     const handleViewProfile = (rider) => {
//         setSelectedProfile({
//             role: 'RIDER',
//             user: {
//                 id: rider.id,
//                 fullname: rider.fullname,
//                 email: rider.email,
//                 phno: rider.phno
//             }
//         });
//     };

//     const closeProfileDialog = () => {
//         setSelectedProfile(null);
//     };

//     return (
//         <div className="passenger-dashboard">
//             <nav className="navbar">
//                 <div className="navbar-logo">
//                     <img src="/projectlogo.png" alt="RideEasy Logo" />
//                     <span>RideEasy</span>
//                 </div>
//                 <div className="navbar-links">
//                     <button onClick={() => setActiveTab('available')} className={activeTab === 'available' ? 'active' : ''}>
//                         Available Rides
//                     </button>
//                     <button onClick={() => setActiveTab('requests')} className={activeTab === 'requests' ? 'active' : ''}>
//                         My Requests
//                     </button>
//                     <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
//                         History
//                     </button>
//                     <img src="/user.png" alt="Profile" onClick={() => setShowProfile(true)} />
//                 </div>
//             </nav>
//             {showProfile && (
//                 <ProfileDialog onClose={() => setShowProfile(false)} role="PASSENGER" />
//             )}
//             {selectedProfile && (
//                 <ProfileDialog
//                     onClose={closeProfileDialog}
//                     role={selectedProfile.role}
//                     user={selectedProfile.user}
//                 />
//             )}
//             <div className="dashboard-content">
//                 <h1>Passenger Dashboard</h1>
//                 {errorMessage && <div className="error-message shake">{errorMessage}</div>}
//                 {successMessage && <div className="success-message green-tick">{successMessage}</div>}
//                 {isLoading && <p>Loading...</p>}
//                 {activeTab === 'available' ? (
//                     <div className="rides-list">
//                         <h2>Available Rides</h2>
//                         {availableRides.length === 0 && !isLoading && <p className="no-data">No rides available.</p>}
//                         <div className="ride-grid">
//                             {availableRides.map((ride) => (
//                                 <div key={ride.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {ride.pickupLocation}</p>
//                                     <p><strong>To:</strong> {ride.destination}</p>
//                                     <p><strong>Date:</strong> {new Date(ride.startTime).toLocaleString()}</p>
//                                     <p><strong>Price:</strong> ₹{ride.price}</p>
//                                     <p><strong>Seats:</strong> {ride.seatsAvailable}</p>
//                                     <p><strong>Rider:</strong> {ride.rider?.fullname || 'Unknown'}</p>
//                                     {ride.vehicleImage && (
//                                         <p>
//                                             <strong>Vehicle:</strong>
//                                             <img
//                                                 src={`http://localhost:9010/${ride.vehicleImage}`}
//                                                 alt="Vehicle"
//                                                 className="vehicle-image"
//                                             />
//                                         </p>
//                                     )}
//                                     <button onClick={() => handleBookRide(ride.id)}>Accept Ride</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : activeTab === 'requests' ? (
//                     <div className="requests-list">
//                         <h2>Your Ride Requests</h2>
//                         {myRequests.length === 0 && !isLoading && <p className="no-data">No ride requests yet.</p>}
//                         <div className="ride-grid">
//                             {myRequests.map((request) => (
//                                 <div key={request.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {request.ride?.pickupLocation || 'N/A'}</p>
//                                     <p><strong>To:</strong> {request.ride?.destination || 'N/A'}</p>
//                                     <p>
//                                         <strong>Date:</strong>{' '}
//                                         {request.ride ? new Date(request.ride.startTime).toLocaleString() : 'N/A'}
//                                     </p>
//                                     <p><strong>Price:</strong> ₹{request.ride?.price || 'N/A'}</p>
//                                     <p><strong>Status:</strong> {request.status}</p>
//                                     {request.status === 'CONFIRMED' && request.ride?.rider && (
//                                         <div className="rider-details">
//                                             <h3>Rider Profile</h3>
//                                             <button onClick={() => handleViewProfile(request.ride.rider)}>
//                                                 View Rider Profile
//                                             </button>
//                                             <div className="on-journey slide-in">
//                                                 <div className="green-line"></div>
//                                                 <p>Confirmed - On journey...</p>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="history-list">
//                         <h2>Ride History</h2>
//                         {history.length === 0 && !isLoading && <p className="no-data">No ride history yet.</p>}
//                         <div className="ride-grid">
//                             {history.map((entry) => (
//                                 <div key={entry.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {entry.pickupLocation}</p>
//                                     <p><strong>To:</strong> {entry.destination}</p>
//                                     <p><strong>Date:</strong> {new Date(entry.startTime).toLocaleString()}</p>
//                                     <p><strong>Price:</strong> ₹{entry.price}</p>
//                                     {entry.vehicleImage && (
//                                         <p>
//                                             <strong>Vehicle:</strong>
//                                             <img
//                                                 src={`http://localhost:9010/${entry.vehicleImage}`}
//                                                 alt="Vehicle"
//                                                 className="vehicle-image"
//                                             />
//                                         </p>
//                                     )}
//                                     <h3>Rider</h3>
//                                     <p><strong>Name:</strong> {entry.riderName}</p>
//                                     <p><strong>Email:</strong> {entry.riderEmail}</p>
//                                     <p><strong>Phone:</strong> {entry.riderPhone || 'Not provided'}</p>
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

// export default PassengerDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProfileDialog from './ProfileDialog';
// import '../styles/PassengerDashboard.css';
// import '../styles/animations.css';

// function PassengerDashboard() {
//     const [availableRides, setAvailableRides] = useState([]);
//     const [myRequests, setMyRequests] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showProfile, setShowProfile] = useState(false);
//     const [selectedProfile, setSelectedProfile] = useState(null);
//     const [activeTab, setActiveTab] = useState('available');
//     const [isLoading, setIsLoading] = useState(false);
//     const passengerId = localStorage.getItem('userId');

//     useEffect(() => {
//         if (activeTab === 'available') {
//             fetchAvailableRides();
//         } else if (activeTab === 'requests') {
//             fetchMyRequests();
//         } else {
//             fetchHistory();
//         }
//     }, [activeTab]);

//     // const fetchAvailableRides = async () => {
//     //     setIsLoading(true);
//     //     try {
//     //         const response = await axios.get('http://localhost:9010/api/rides/available', {
//     //             withCredentials: true
//     //         });
//     //         console.log('Available rides response:', response.data);
//     //         const rides = Array.isArray(response.data) ? response.data : [];
//     //         setAvailableRides(rides.filter(ride => ride.status === 'PENDING'));
//     //         console.log('Filtered available rides:', rides.filter(ride => ride.status === 'PENDING'));
//     //         setErrorMessage('');
//     //     } catch (error) {
//     //         console.error('Fetch available rides error:', error);
//     //         let errorMsg = 'Failed to fetch available rides. Please try again.';
//     //         if (error.response) {
//     //             errorMsg = error.response.data || `Server error: ${error.response.status}`;
//     //         } else if (error.request) {
//     //             errorMsg = 'No response from server. Please check if the backend is running.';
//     //         }
//     //         setErrorMessage(errorMsg);
//     //         setAvailableRides([]);
//     //     } finally {
//     //         setIsLoading(false);
//     //     }
//     // };
//     const fetchAvailableRides = async () => {
//     setIsLoading(true);
//     try {
//         const response = await axios.get('http://localhost:9010/api/rides/available', {
//             withCredentials: true
//         });
//         console.log('Available rides response:', response.data);
//         const rides = Array.isArray(response.data) ? response.data : [];
//         setAvailableRides(rides.filter(ride => ride.status === 'PENDING')); // Keep filter for consistency
//         setErrorMessage('');
//     } catch (error) {
//         console.error('Fetch available rides error:', error);
//         let errorMsg = 'Failed to fetch available rides. Please try again.';
//         if (error.response) {
//             errorMsg = typeof error.response.data === 'string' ? error.response.data : `Server error: ${error.response.status}`;
//         } else if (error.request) {
//             errorMsg = 'No response from server. Please check if the backend is running.';
//         }
//         setErrorMessage(errorMsg);
//         setAvailableRides([]);
//     } finally {
//         setIsLoading(false);
//     }
// };

//     // const fetchMyRequests = async () => {
//     //     setIsLoading(true);
//     //     try {
//     //         const response = await axios.get('http://localhost:9010/api/ride-requests/my-requests', {
//     //             params: { passengerId },
//     //             withCredentials: true
//     //         });
//     //         setMyRequests(Array.isArray(response.data) ? response.data : []);
//     //         setErrorMessage('');
//     //     } catch (error) {
//     //         console.error('Fetch my requests error:', error);
//     //         let errorMsg = 'Failed to fetch your requests.';
//     //         if (error.response) {
//     //             errorMsg = error.response.data || `Server error: ${error.response.status}`;
//     //         }
//     //         setErrorMessage(errorMsg);
//     //         setMyRequests([]);
//     //     } finally {
//     //         setIsLoading(false);
//     //     }
//     // };
//     const fetchMyRequests = async () => {
//     try {
//         const response = await axios.get('http://localhost:9010/api/ride-requests/passenger-requests', {
//             params: { passengerId },
//             withCredentials: true
//         });
//         console.log('My requests response:', response.data);
//         const requests = Array.isArray(response.data) ? response.data : [];
//         setRequests(requests);
//         setErrorMessage('');
//     } catch (error) {
//         console.error('Fetch my requests error:', error);
//         let errorMsg = 'Failed to fetch your requests. Please try again.';
//         if (error.response) {
//             errorMsg = typeof error.response.data === 'string' ? error.response.data : `Server error: ${error.response.status}`;
//         } else if (error.request) {
//             errorMsg = 'No response from server. Please check if the backend is running.';
//         }
//         setErrorMessage(errorMsg);
//         setRequests([]);
//     }
// };

//     const fetchHistory = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get('http://localhost:9010/api/rides/history', {
//                 params: { userId: passengerId, role: 'PASSENGER' },
//                 withCredentials: true
//             });
//             setHistory(Array.isArray(response.data) ? response.data : []);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Fetch history error:', error);
//             let errorMsg = 'Failed to fetch history.';
//             if (error.response) {
//                 errorMsg = error.response.data || `Server error: ${error.response.status}`;
//             }
//             setErrorMessage(errorMsg);
//             setHistory([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // const handleBookRide = async (rideId) => {
//     //     try {
//     //         await axios.post('http://localhost:9010/api/ride-requests', {
//     //             rideId,
//     //             passengerId
//     //         }, {
//     //             withCredentials: true
//     //         });
//     //         setSuccessMessage('Ride booked successfully! Waiting for rider confirmation.');
//     //         fetchAvailableRides();
//     //         fetchMyRequests();
//     //     } catch (error) {
//     //         console.error('Book ride error:', error);
//     //         let errorMsg = error.response?.data || 'Failed to book ride.';
//     //         setErrorMessage(errorMsg);
//     //     }
//     // };
//     const handleBookRide = async (rideId) => {
//     try {
//         const response = await axios.post('http://localhost:9010/api/ride-requests', {
//             rideId,
//             passengerId
//         }, {
//             withCredentials: true
//         });
//         console.log('Ride request response:', response.data);
//         setSuccessMessage('Ride booked successfully! Waiting for rider confirmation.');
//         fetchAvailableRides();
//         fetchMyRequests();
//     } catch (error) {
//         console.error('Book ride error:', error);
//         let errorMsg = error.response?.data || 'Failed to book ride.';
//         setErrorMessage(errorMsg);
//     }
// };

//     // const handleViewProfile = (rider) => {
//     //     setSelectedProfile({
//     //         role: 'RIDER',
//     //         user: {
//     //             id: rider.id,
//     //             fullname: rider.fullname,
//     //             email: rider.email,
//     //             phno: rider.phno
//     //         }
//     //     });
//     // };
//     const handleViewProfile = async (rideId, rider) => {
//     try {
//         const response = await axios.get('http://localhost:9010/api/ride-requests/confirmed-profiles', {
//             params: { rideId, userId: passengerId },
//             withCredentials: true
//         });
//         console.log('Confirmed rider profile:', response.data);
//         const profile = response.data[0] || {
//             id: rider.id,
//             fullname: rider.fullname || 'Unknown',
//             email: rider.email || 'Unknown',
//             phno: rider.phno || 'Not provided'
//         };
//         setSelectedProfile({
//             role: 'RIDER',
//             user: {
//                 id: profile.id,
//                 fullname: profile.fullname,
//                 email: profile.email,
//                 phno: profile.phno
//             }
//         });
//     } catch (error) {
//         console.error('Fetch rider profile error:', error);
//         setErrorMessage('Failed to fetch rider profile.');
//         // Fallback to existing data
//         setSelectedProfile({
//             role: 'RIDER',
//             user: {
//                 id: rider.id,
//                 fullname: rider.fullname || 'Unknown',
//                 email: rider.email || 'Unknown',
//                 phno: rider.phno || 'Not provided'
//             }
//         });
//     }
// };

//     const closeProfileDialog = () => {
//         setSelectedProfile(null);
//     };

//     return (
//         <div className="passenger-dashboard">
//             <nav className="navbar">
//                 <div className="navbar-logo">
//                     <img src="/projectlogo.png" alt="RideEasy Logo" />
//                     <span>RideEasy</span>
//                 </div>
//                 <div className="navbar-links">
//                     <button onClick={() => setActiveTab('available')} className={activeTab === 'available' ? 'active' : ''}>
//                         Available Rides
//                     </button>
//                     <button onClick={() => setActiveTab('requests')} className={activeTab === 'requests' ? 'active' : ''}>
//                         My Requests
//                     </button>
//                     <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
//                         History
//                     </button>
//                     <img src="/user.png" alt="Profile" onClick={() => setShowProfile(true)} />
//                 </div>
//             </nav>
//             {showProfile && (
//                 <ProfileDialog onClose={() => setShowProfile(false)} role="PASSENGER" />
//             )}
//             {selectedProfile && (
//                 <ProfileDialog
//                     onClose={closeProfileDialog}
//                     role={selectedProfile.role}
//                     user={selectedProfile.user}
//                 />
//             )}
//             <div className="dashboard-content">
//                 <h1>Passenger Dashboard</h1>
//                 {errorMessage && (
//                     <div className="error-message shake">
//                         {errorMessage}
//                         <button onClick={fetchAvailableRides}>Retry</button>
//                     </div>
//                 )}
//                 {successMessage && <div className="success-message green-tick">{successMessage}</div>}
//                 {isLoading && <p>Loading...</p>}
//                 {activeTab === 'available' ? (
//                     <div className="rides-list">
//                         <h2>Available Rides</h2>
//                         <button onClick={fetchAvailableRides}>Refresh Rides</button>
//                         {availableRides.length === 0 && !isLoading && <p className="no-data">No rides available.</p>}
//                         <div className="ride-grid">
//                             {availableRides.map((ride) => (
//                                 <div key={ride.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {ride.pickupLocation || 'N/A'}</p>
//                                     <p><strong>To:</strong> {ride.destination || 'N/A'}</p>
//                                     <p><strong>Date:</strong> {ride.startTime ? new Date(ride.startTime).toLocaleString() : 'N/A'}</p>
//                                     <p><strong>Price:</strong> ₹{ride.price || 'N/A'}</p>
//                                     <p><strong>Seats:</strong> {ride.seatsAvailable || 'N/A'}</p>
//                                     <p><strong>Rider:</strong> {ride.rider?.fullname || 'Unknown'}</p>
//                                     {ride.vehicleImage && (
//                                         <p>
//                                             <strong>Vehicle:</strong>
//                                             <img
//                                                 src={`http://localhost:9010/${ride.vehicleImage}`}
//                                                 alt="Vehicle"
//                                                 className="vehicle-image"
//                                                 onError={(e) => e.target.src = '/placeholder.png'} // Fallback image
//                                             />
//                                         </p>
//                                     )}
//                                     <button onClick={() => handleBookRide(ride.id)}>Accept Ride</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : activeTab === 'requests' ? (
//                     <div className="requests-list">
//                         <h2>Your Ride Requests</h2>
//                         {myRequests.length === 0 && !isLoading && <p className="no-data">No ride requests yet.</p>}
//                         <div className="ride-grid">
//                             {myRequests.map((request) => (
//                                 <div key={request.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {request.ride?.pickupLocation || 'N/A'}</p>
//                                     <p><strong>To:</strong> {request.ride?.destination || 'N/A'}</p>
//                                     <p>
//                                         <strong>Date:</strong>{' '}
//                                         {request.ride ? new Date(request.ride.startTime).toLocaleString() : 'N/A'}
//                                     </p>
//                                     <p><strong>Price:</strong> ₹{request.ride?.price || 'N/A'}</p>
//                                     <p><strong>Status:</strong> {request.status}</p>
//                                     {request.status === 'CONFIRMED' && request.ride?.rider && (
//                                         <div className="rider-details">
//                                             <h3>Rider Profile</h3>
//                                             <button onClick={() => handleViewProfile(request.ride.id, request.ride.rider)}>
//     View Rider Profile
// </button>
//                                             <div className="on-journey slide-in">
//                                                 <div className="green-line"></div>
//                                                 <p>Confirmed - On journey...</p>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="history-list">
//                         <h2>Ride History</h2>
//                         {history.length === 0 && !isLoading && <p className="no-data">No ride history yet.</p>}
//                         <div className="ride-grid">
//                             {history.map((entry) => (
//                                 <div key={entry.id} className="ride-card">
//                                     <h3>Ride Details</h3>
//                                     <p><strong>From:</strong> {entry.pickupLocation}</p>
//                                     <p><strong>To:</strong> {entry.destination}</p>
//                                     <p><strong>Date:</strong> {new Date(entry.startTime).toLocaleString()}</p>
//                                     <p><strong>Price:</strong> ₹{entry.price}</p>
//                                     {entry.vehicleImage && (
//                                         <p>
//                                             <strong>Vehicle:</strong>
//                                             <img
//                                                 src={`http://localhost:9010/${entry.vehicleImage}`}
//                                                 alt="Vehicle"
//                                                 className="vehicle-image"
//                                                 onError={(e) => e.target.src = '/placeholder.png'}
//                                             />
//                                         </p>
//                                     )}
//                                     <h3>Rider</h3>
//                                     <p><strong>Name:</strong> {entry.riderName}</p>
//                                     <p><strong>Email:</strong> {entry.riderEmail}</p>
//                                     <p><strong>Phone:</strong> {entry.riderPhone || 'Not provided'}</p>
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

// export default PassengerDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfileDialog from './ProfileDialog';
import '../styles/PassengerDashboard.css';
import '../styles/animations.css';

function PassengerDashboard() {
    const [availableRides, setAvailableRides] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [history, setHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('available');
    const [isLoading, setIsLoading] = useState(false);
    const [passengerId, setPassengerId] = useState(localStorage.getItem('userId'));
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
        if (userRole !== 'PASSENGER') {
            setErrorMessage('Access denied. Only passengers can access this dashboard.');
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
            setPassengerId(userId);
        } catch (error) {
            console.error('Fetch user profile error:', error);
            setErrorMessage('Failed to fetch user profile. Please log in again.');
            localStorage.clear();
            navigate('/');
        }
    };

    // Fetch available rides
    const fetchAvailableRides = async (retryCount = 3, delay = 1000) => {
        if (!passengerId) {
            setErrorMessage('Please log in to access rides.');
            navigate('/');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:9010/api/rides/available', {
                withCredentials: true,
                params: { t: new Date().getTime() }
            });
            console.log('Available rides response:', response.data);
            const rides = Array.isArray(response.data) ? response.data : [];
            const filteredRides = rides.filter(ride => ride.status === 'PENDING');
            setAvailableRides(filteredRides);
            setErrorMessage('');
        } catch (error) {
            console.error('Fetch available rides error:', error);
            let errorMsg = 'Failed to fetch available rides.';
            if (error.response) {
                errorMsg = error.response.data || `Server error: ${error.response.status}`;
                if (error.response.status === 405 && retryCount > 0) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return fetchAvailableRides(retryCount - 1, delay * 2);
                }
            } else if (error.request) {
                errorMsg = 'No response from server. Check backend on port 9010.';
            }
            setErrorMessage(errorMsg);
            setAvailableRides([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch passenger's ride requests
    const fetchMyRequests = async (retryCount = 3, delay = 1000) => {
        if (!passengerId) {
            setErrorMessage('Please log in to access requests.');
            navigate('/');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:9010/api/ride-requests/passenger-requests', {
                params: { passengerId },
                withCredentials: true
            });
            console.log('My requests response:', response.data);
            const requests = Array.isArray(response.data) ? response.data : [];
            setMyRequests(requests);
            setErrorMessage('');
        } catch (error) {
            console.error('Fetch my requests error:', error);
            let errorMsg = 'Failed to fetch your requests.';
            if (error.response) {
                errorMsg = error.response.data || `Server error: ${error.response.status}`;
                if (error.response.status === 400 && retryCount > 0) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return fetchMyRequests(retryCount - 1, delay * 2);
                }
            } else if (error.request) {
                errorMsg = 'No response from server. Check backend.';
            }
            setErrorMessage(errorMsg);
            setMyRequests([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch ride history
    const fetchRideHistory = async () => {
        if (!passengerId) {
            setErrorMessage('Please log in to view history.');
            navigate('/');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:9010/api/rides/history', {
                params: { userId: passengerId, role: 'PASSENGER' },
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
                errorMsg = error.response.status === 404
                    ? 'History endpoint not found. Verify /api/rides/history.'
                    : error.response.data || `Server error: ${error.response.status}`;
            } else if (error.request) {
                errorMsg = 'No response from server. Check backend on port 9010.';
            }
            setErrorMessage(errorMsg);
            setHistory([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Book a ride
    const handleBookRide = async (rideId) => {
        if (!passengerId) {
            setErrorMessage('Please log in to book a ride.');
            navigate('/');
            return;
        }
        try {
            const response = await axios.post('http://localhost:9010/api/ride-requests', {
                rideId,
                passengerId
            }, {
                withCredentials: true
            });
            console.log('Ride request response:', response.data);
            setSuccessMessage('Ride booked successfully! Waiting for rider confirmation.');
            fetchAvailableRides();
            fetchMyRequests();
        } catch (error) {
            console.error('Book ride error:', error);
            setErrorMessage(error.response?.data || 'Failed to book ride.');
        }
    };

    // View rider profile
    const handleViewProfile = async (rideId, rider) => {
        if (!passengerId) {
            setErrorMessage('Please log in to view profiles.');
            navigate('/');
            return;
        }
        try {
            const response = await axios.get('http://localhost:9010/api/ride-requests/confirmed-profiles', {
                params: { rideId, userId: passengerId },
                withCredentials: true
            });
            console.log('Confirmed rider profile:', response.data);
            const profile = response.data[0] || {
                id: rider.id,
                fullname: rider.fullname || 'Unknown',
                email: rider.email || 'Unknown',
                phno: rider.phno || 'Not provided'
            };
            setSelectedProfile({
                role: 'RIDER',
                user: {
                    id: profile.id,
                    fullname: profile.fullname,
                    email: profile.email,
                    phno: profile.phno
                }
            });
        } catch (error) {
            console.error('Fetch rider profile error:', error);
            setErrorMessage('Failed to fetch rider profile.');
            setSelectedProfile({
                role: 'RIDER',
                user: {
                    id: rider.id,
                    fullname: rider.fullname || 'Unknown',
                    email: rider.email || 'Unknown',
                    phno: rider.phno || 'Not provided'
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
        if (passengerId) {
            if (activeTab === 'available') {
                fetchAvailableRides();
            } else if (activeTab === 'requests') {
                fetchMyRequests();
            } else if (activeTab === 'history') {
                fetchRideHistory();
            }
        }
    }, [activeTab, passengerId]);

    return (
        <div className="passenger-dashboard">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="/projectlogo.png" alt="RideEasy Logo" />
                    <span>RideEasy</span>
                </div>
                <div className="navbar-links">
                    <button onClick={() => setActiveTab('available')} className={activeTab === 'available' ? 'active' : ''}>
                        Available Rides
                    </button>
                    <button onClick={() => setActiveTab('requests')} className={activeTab === 'requests' ? 'active' : ''}>
                        My Requests
                    </button>
                    <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
                        History
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                    <img src="/user.png" alt="Profile" onClick={() => setShowProfile(true)} />
                </div>
            </nav>
            {showProfile && (
                <ProfileDialog onClose={() => setShowProfile(false)} role="PASSENGER" />
            )}
            {selectedProfile && (
                <ProfileDialog
                    onClose={closeProfileDialog}
                    role={selectedProfile.role}
                    user={selectedProfile.user}
                />
            )}
            <div className="dashboard-content">
                <h1>Passenger Dashboard</h1>
                {errorMessage && (
                    <div className="error-message shake">
                        {errorMessage}
                        <button
                            onClick={() => {
                                if (activeTab === 'available') fetchAvailableRides();
                                else if (activeTab === 'requests') fetchMyRequests();
                                else fetchRideHistory();
                            }}
                        >
                            Retry
                        </button>
                    </div>
                )}
                {successMessage && <div className="success-message green-tick">{successMessage}</div>}
                {isLoading && <p>Loading...</p>}
                {activeTab === 'available' ? (
                    <div className="rides-list">
                        <h2>Available Rides</h2>
                        <button onClick={fetchAvailableRides}>Refresh Rides</button>
                        {availableRides.length === 0 && !isLoading && <p className="no-data">No rides available. Try refreshing or check back later.</p>}
                        <div className="ride-grid">
                            {availableRides.map((ride) => (
                                <div key={ride.id} className="ride-card">
                                    <h3>Ride Details</h3>
                                    <p><strong>From:</strong> {ride.pickupLocation || 'N/A'}</p>
                                    <p><strong>To:</strong> {ride.destination || 'N/A'}</p>
                                    <p><strong>Date:</strong> {ride.startTime ? new Date(ride.startTime).toLocaleString() : 'N/A'}</p>
                                    <p><strong>Price:</strong> ₹{ride.price || 'N/A'}</p>
                                    <p><strong>Seats:</strong> {ride.seatsAvailable || 'N/A'}</p>
                                    <p><strong>Rider:</strong> {ride.rider?.fullname || 'Unknown'}</p>
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
                                    <button onClick={() => handleBookRide(ride.id)}>Accept Ride</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'requests' ? (
                    <div className="requests-list">
                        <h2>Your Ride Requests</h2>
                        {myRequests.length === 0 && !isLoading && <p className="no-data">No ride requests yet.</p>}
                        <div className="ride-grid">
                            {myRequests.map((request) => (
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
                                    {request.status === 'CONFIRMED' && request.ride?.rider && (
                                        <div className="rider-details">
                                            <h3>Rider Profile</h3>
                                            <button onClick={() => handleViewProfile(request.ride.id, request.ride.rider)}>
                                                View Rider Profile
                                            </button>
                                            <div className="on-journey slide-in">
                                                <div className="green-line"></div>
                                                <p>Confirmed - On journey...</p>
                                            </div>
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
                                    <h3>Rider</h3>
                                    <p><strong>Name:</strong> {entry.ride?.rider?.fullname || 'Unknown'}</p>
                                    <p><strong>Email:</strong> {entry.ride?.rider?.email || 'Unknown'}</p>
                                    <p><strong>Phone:</strong> {entry.ride?.rider?.phno || 'Not provided'}</p>
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

export default PassengerDashboard;