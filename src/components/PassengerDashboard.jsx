import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileDialog from './ProfileDialog';
import '../styles/PassengerDashboard.css';
import '../styles/animations.css';
import { useNavigate } from 'react-router-dom';

const styles = `
  .ride-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 16px 0;
    padding: 20px;
    transition: transform 0.2s;
  }

  .ride-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .ride-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }

  .ride-details p {
    margin: 8px 0;
    color: #333;
    font-size: 14px;
  }

  .ride-details strong {
    color: #2c3e50;
  }

  .ride-details button {
    width: 100%;
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 12px;
    transition: background-color 0.2s;
    grid-column: 1 / -1;
  }

  .ride-details button:hover {
    background-color: #45a049;
  }

  .ride-details button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const PassengerDashboard = () => {
  const [rides, setRides] = useState([]);
  const [myRides, setMyRides] = useState([]);
  const [rideHistory, setRideHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('available-rides');
  const [isLoading, setIsLoading] = useState(true);
  const [passengerId, setPassengerId] = useState(null);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setErrorMessage('Please log in to access the dashboard');
        navigate('/');
        return null;
      }

      const user = JSON.parse(storedUser);
      if (!user || !user.id) {
        setErrorMessage('Invalid user data');
        navigate('/');
        return null;
      }

      if (user.role !== 'PASSENGER') {
        setErrorMessage('Access denied. Only passengers can access this dashboard');
        navigate('/');
        return null;
      }

      setPassengerId(user.id);
      return user.id;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setErrorMessage('Failed to fetch user profile. Please try logging in again.');
      navigate('/');
      return null;
    }
  };

  const fetchAvailableRides = async () => {
    try {
      console.log('Fetching available rides');
      const response = await axios.get('http://localhost:9010/api/rides/available', {
        withCredentials: true
      });
      
      console.log('Available rides response:', response.data);
      
      if (Array.isArray(response.data)) {
        // Filter out rides that are already booked by this passenger
        const filteredRides = response.data
          .filter(ride => 
            ride.status === 'POSTED' && 
            ride.seatsAvailable > 0 &&
            ride.rider && // Ensure rider information exists
            ride.rider.id // Ensure rider has an ID
          )
          .map(ride => ({
            id: ride.id,
            pickupLocation: ride.pickupLocation,
            destination: ride.destination,
            startTime: new Date(ride.startTime).toISOString(),
            price: parseFloat(ride.price),
            seatsAvailable: parseInt(ride.seatsAvailable),
            vehicleImage: ride.vehicleImage,
            rider: {
              id: ride.rider.id,
              fullname: ride.rider.fullname,
              email: ride.rider.email,
              phno: ride.rider.phno
            }
          }));
        
        console.log('Filtered rides:', filteredRides);
        setRides(filteredRides);
        setErrorMessage('');
      } else {
        console.error('Invalid response format:', response.data);
        setErrorMessage('Invalid response format from server');
        setRides([]);
      }
    } catch (error) {
      console.error('Fetch available rides error:', error);
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setErrorMessage('Server error while fetching rides');
            break;
          default:
            setErrorMessage('Failed to fetch available rides');
        }
      } else {
        setErrorMessage('Network error while fetching rides');
      }
      setRides([]);
    }
  };

  const fetchMyRequests = async (retryCount = 3, delay = 1000) => {
    if (!passengerId) {
      setErrorMessage('Please log in to access requests.');
      navigate('/');
      return;
    }
    setIsLoading(true);
    try {
      console.log('Fetching requests for passenger ID:', passengerId);
      const response = await axios.get('http://localhost:9010/api/ride-requests/my-requests', {
        params: { passengerId: parseInt(passengerId) },
        withCredentials: true
      });
      console.log('My requests response:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        // Ensure each request has complete ride and rider information
        const requestsWithDetails = response.data.map(request => {
          // Ensure ride object exists
          const ride = request.ride || {};
          // Ensure rider information exists
          const rider = ride.rider || {};
          
          return {
            ...request,
            ride: {
              ...ride,
              rider: rider
            },
            passenger: request.passenger || {},
            status: request.status || 'REQUESTED'
          };
        });
        
        console.log('Processed requests:', requestsWithDetails);
        setMyRides(requestsWithDetails);
        setErrorMessage('');
      } else {
        console.warn('Invalid response format for my requests:', response.data);
        setMyRides([]);
        setErrorMessage('Invalid response format from server');
      }
    } catch (error) {
      console.error('Fetch my requests error:', error);
      let errorMsg = 'Failed to fetch your ride requests.';
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMsg = error.response.data || 'Invalid passenger ID';
        } else if (error.response.status === 404) {
          errorMsg = 'No ride requests found';
        } else if (error.response.status === 500) {
          errorMsg = 'Server error. Please try again later.';
          if (retryCount > 0) {
            console.log(`Retrying... Attempts left: ${retryCount}`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchMyRequests(retryCount - 1, delay * 2);
          }
        } else {
          errorMsg = error.response.data || `Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMsg = 'No response from server. Please check your connection.';
      }
      
      setErrorMessage(errorMsg);
      setMyRides([]);
    } finally {
      setIsLoading(false);
    }
  };

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
      setRideHistory(history);
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
      setRideHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookRide = async (rideId) => {
    try {
      if (!passengerId) {
        setErrorMessage('Please log in to book a ride');
        return;
      }

      // Clear any previous messages
      setErrorMessage('');
      setSuccessMessage('');

      console.log('Booking ride:', { rideId, passengerId });

      const response = await axios.post(
        'http://localhost:9010/api/ride-requests/book',
        {
          rideId: parseInt(rideId),
          passengerId: parseInt(passengerId)
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      if (response.data) {
        console.log('Booking response:', response.data);
        setSuccessMessage('Ride booked successfully! Waiting for rider confirmation.');
        // Refresh available rides
        await fetchAvailableRides();
        // Refresh my requests
        await fetchMyRequests();
      }
    } catch (error) {
      console.error('Book ride error:', error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage(error.response.data || 'Invalid request data');
            break;
          case 404:
            setErrorMessage('Ride not found');
            break;
          case 409:
            setErrorMessage('Ride is no longer available or you have already booked this ride');
            break;
          case 500:
            setErrorMessage('Server error while booking ride. Please try again later.');
            break;
          default:
            setErrorMessage('Failed to book ride');
        }
      } else if (error.request) {
        setErrorMessage('No response from server. Please check your connection.');
      } else {
        setErrorMessage('Error booking ride: ' + error.message);
      }
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const closeProfileDialog = () => {
    setShowProfile(false);
    setSelectedProfile(null);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setErrorMessage('');
      const id = await fetchCurrentUser();
      if (id) {
        await fetchAvailableRides();
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="passenger-dashboard">
        <div className="dashboard-header">
          <h1>Passenger Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="dashboard-content">
          <div className="available-rides">
            <h2>Available Rides</h2>
            {rides.length === 0 ? (
              <p>No rides available at the moment</p>
            ) : (
              <div className="rides-list">
                {rides.map(ride => (
                  <div key={ride.id} className="ride-card">
                    <h3>Ride #{ride.id}</h3>
                    <p><strong>From:</strong> {ride.pickupLocation}</p>
                    <p><strong>To:</strong> {ride.destination}</p>
                    <p><strong>Time:</strong> {new Date(ride.startTime).toLocaleString()}</p>
                    <p><strong>Seats Available:</strong> {ride.seatsAvailable}</p>
                    <p><strong>Price:</strong> ${ride.price}</p>
                    <p><strong>Rider:</strong> {ride.rider?.fullname}</p>
                    <button 
                      onClick={() => handleBookRide(ride.id)}
                      className="book-button"
                      disabled={ride.seatsAvailable <= 0}
                    >
                      {ride.seatsAvailable <= 0 ? 'No Seats Available' : 'Book Ride'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PassengerDashboard;