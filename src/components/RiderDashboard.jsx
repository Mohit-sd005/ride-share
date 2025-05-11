import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileDialog from './ProfileDialog';
import '../styles/RiderDashboard.css';
import '../styles/animations.css';
import { useNavigate } from 'react-router-dom';

function RiderDashboard() {
    const [rides, setRides] = useState([]);
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('my-rides');
    const [loading, setLoading] = useState(true);
    const [riderId, setRiderId] = useState(null);
    const [showPostRideForm, setShowPostRideForm] = useState(false);
    const [newRide, setNewRide] = useState({
        pickupLocation: '',
        destination: '',
        startTime: '',
        price: '',
        seatsAvailable: '',
        vehicleImage: null
    });
    const navigate = useNavigate();

    const fetchCurrentUser = async () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                setError('Please log in to access the dashboard');
                navigate('/');
                return null;
            }

            const user = JSON.parse(storedUser);
            if (!user || !user.id) {
                setError('Invalid user data');
                navigate('/');
                return null;
            }

            // Verify the user is a rider
            if (user.role !== 'RIDER') {
                setError('Access denied. Only riders can access this dashboard');
                navigate('/');
                return null;
            }

            setRiderId(user.id);
            return user.id;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to fetch user profile. Please try logging in again.');
            navigate('/');
            return null;
        }
    };

    const fetchMyRides = async (id) => {
        try {
            console.log('Fetching rides for rider ID:', id);
            const response = await axios.get(`http://localhost:9010/api/rides/my-rides?riderId=${id}`, {
                withCredentials: true
            });
            
            if (Array.isArray(response.data)) {
                setRides(response.data);
            } else {
                console.error('Invalid response format:', response.data);
                setError('Invalid response format from server');
            }
        } catch (error) {
            console.error('Fetch my rides error:', error);
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError('Invalid rider ID');
                        break;
                    case 404:
                        setError('Rider not found');
                        break;
                    case 500:
                        setError('Server error while fetching rides');
                        break;
                    default:
                        setError('Failed to fetch rides');
                }
            } else {
                setError('Network error while fetching rides');
            }
        }
    };

    const fetchRideRequests = async (id) => {
        try {
            console.log('Fetching requests for rider ID:', id);
            const response = await axios.get(`http://localhost:9010/api/ride-requests/rider-requests?riderId=${id}`, {
                withCredentials: true
            });
            
            if (Array.isArray(response.data)) {
                setRequests(response.data);
            } else {
                console.error('Invalid response format:', response.data);
                setError('Invalid response format from server');
            }
        } catch (error) {
            console.error('Fetch ride requests error:', error);
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError('Invalid rider ID');
                        break;
                    case 404:
                        setError('Rider not found');
                        break;
                    case 500:
                        setError('Server error while fetching requests');
                        break;
                    default:
                        setError('Failed to fetch ride requests');
                }
            } else {
                setError('Network error while fetching requests');
            }
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            const response = await axios.put(
                `http://localhost:9010/api/ride-requests/${requestId}/accept`,
                {},
                { withCredentials: true }
            );
            setSuccess('Request accepted successfully');
            fetchRideRequests(riderId);
        } catch (error) {
            console.error('Accept request error:', error);
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError('Invalid request');
                        break;
                    case 404:
                        setError('Request not found');
                        break;
                    case 409:
                        setError('Request cannot be accepted');
                        break;
                    case 500:
                        setError('Server error while accepting request');
                        break;
                    default:
                        setError('Failed to accept request');
                }
            } else {
                setError('Network error while accepting request');
            }
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            const response = await axios.put(
                `http://localhost:9010/api/ride-requests/${requestId}/reject`,
                {},
                { withCredentials: true }
            );
            setSuccess('Request rejected successfully');
            fetchRideRequests(riderId);
        } catch (error) {
            console.error('Reject request error:', error);
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError('Invalid request');
                        break;
                    case 404:
                        setError('Request not found');
                        break;
                    case 409:
                        setError('Request cannot be rejected');
                        break;
                    case 500:
                        setError('Server error while rejecting request');
                        break;
                    default:
                        setError('Failed to reject request');
                }
            } else {
                setError('Network error while rejecting request');
            }
        }
    };

    const handleEndRide = async (rideId) => {
        try {
            const response = await axios.put(
                `http://localhost:9010/api/rides/${rideId}/end`,
                {},
                { withCredentials: true }
            );
            setSuccess('Ride ended successfully');
            fetchMyRides(riderId);
        } catch (error) {
            console.error('End ride error:', error);
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError('Invalid ride');
                        break;
                    case 404:
                        setError('Ride not found');
                        break;
                    case 409:
                        setError('Ride cannot be ended');
                        break;
                    case 500:
                        setError('Server error while ending ride');
                        break;
                    default:
                        setError('Failed to end ride');
                }
            } else {
                setError('Network error while ending ride');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError('');
            const id = await fetchCurrentUser();
            if (id) {
                await Promise.all([
                    fetchMyRides(id),
                    fetchRideRequests(id)
                ]);
            }
            setLoading(false);
        };
        loadData();
    }, []);

    // View passenger profile
    const handleViewProfile = async (passengerId) => {
        try {
            const response = await axios.get('http://localhost:9010/api/users/profile', {
                params: { userId: passengerId },
                withCredentials: true
            });
            console.log('Passenger profile response:', response.data);
            setSelectedProfile(response.data);
            setShowProfile(true);
        } catch (error) {
            console.error('View profile error:', error);
            setError('Failed to fetch passenger profile.');
        }
    };

    // Close profile dialog
    const closeProfileDialog = () => {
        setShowProfile(false);
        setSelectedProfile(null);
    };

    // Handle post ride form input changes
    const handlePostRideChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'vehicleImage') {
            setNewRide(prev => ({ ...prev, vehicleImage: files[0] }));
        } else {
            setNewRide(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handle post ride form submission
    const handlePostRide = async (e) => {
        e.preventDefault();
        if (!riderId) {
            setError('Please log in to post a ride.');
            return;
        }

        try {
            // Calculate commission
            const price = parseFloat(newRide.price);
            let commission;
            if (price < 5000) {
                commission = price * 0.10;
            } else if (price <= 10000) {
                commission = price * 0.15;
            } else {
                commission = price * 0.20;
            }

            // Show commission payment dialog
            const confirmPayment = window.confirm(
                `Commission amount: $${commission.toFixed(2)}\n\n` +
                'Please confirm payment to post the ride.'
            );

            if (!confirmPayment) {
                setError('Commission payment required to post ride');
                return;
            }

            const formData = new FormData();
            formData.append('pickupLocation', newRide.pickupLocation);
            formData.append('destination', newRide.destination);
            formData.append('startTime', newRide.startTime);
            formData.append('price', newRide.price);
            formData.append('seatsAvailable', newRide.seatsAvailable);
            formData.append('riderId', riderId);
            formData.append('commissionPaid', true);
            if (newRide.vehicleImage) {
                formData.append('vehicleImage', newRide.vehicleImage);
            }

            console.log('Posting ride with data:', {
                pickupLocation: newRide.pickupLocation,
                destination: newRide.destination,
                startTime: newRide.startTime,
                price: newRide.price,
                seatsAvailable: newRide.seatsAvailable,
                riderId: riderId,
                commission: commission
            });

            const response = await axios.post(
                'http://localhost:9010/api/rides/post',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                }
            );

            if (response.data) {
                console.log('Post ride response:', response.data);
                setSuccess('Ride posted successfully!');
                setShowPostRideForm(false);
                setNewRide({
                    pickupLocation: '',
                    destination: '',
                    startTime: '',
                    price: '',
                    seatsAvailable: '',
                    vehicleImage: null
                });
                // Refresh the rides list
                await fetchMyRides(riderId);
            } else {
                setError('Invalid response from server');
            }
        } catch (error) {
            console.error('Post ride error:', error);
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError(error.response.data || 'Invalid ride data');
                        break;
                    case 401:
                        setError('Please log in to post a ride');
                        break;
                    case 402:
                        setError('Commission payment required: ' + error.response.data);
                        break;
                    case 500:
                        setError('Server error while posting ride');
                        break;
                    default:
                        setError('Failed to post ride');
                }
            } else {
                setError('Network error while posting ride');
            }
        }
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="rider-dashboard">
            <div className="dashboard-header">
                <h1>Rider Dashboard</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="/projectlogo.png" alt="RideEasy Logo" />
                    <span>RideEasy</span>
                </div>
                <div className="navbar-profile">
                    <img
                        src="/user.png"
                        alt="Profile"
                        onClick={() => setShowProfile(true)}
                    />
                </div>
            </nav>

            {showProfile && (
                <ProfileDialog
                    onClose={closeProfileDialog}
                    profile={selectedProfile}
                    role="RIDER"
                />
            )}

            <div className="dashboard-content">
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="tabs">
                    <button
                        className={activeTab === 'my-rides' ? 'active' : ''}
                        onClick={() => handleTabChange('my-rides')}
                    >
                        My Rides
                    </button>
                    <button
                        className={activeTab === 'requests' ? 'active' : ''}
                        onClick={() => handleTabChange('requests')}
                    >
                        Ride Requests
                    </button>
                </div>

                {activeTab === 'my-rides' && (
                    <div className="my-rides">
                        <div className="my-rides-header">
                            <h2>My Rides</h2>
                            <button 
                                className="post-ride-button"
                                onClick={() => setShowPostRideForm(!showPostRideForm)}
                            >
                                {showPostRideForm ? 'Cancel' : 'Post New Ride'}
                            </button>
                        </div>

                        {showPostRideForm && (
                            <div className="post-ride-form">
                                <h3>Post a New Ride</h3>
                                <form onSubmit={handlePostRide}>
                                    <input
                                        type="text"
                                        name="pickupLocation"
                                        value={newRide.pickupLocation}
                                        onChange={handlePostRideChange}
                                        placeholder="Pickup Location"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="destination"
                                        value={newRide.destination}
                                        onChange={handlePostRideChange}
                                        placeholder="Destination"
                                        required
                                    />
                                    <input
                                        type="datetime-local"
                                        name="startTime"
                                        value={newRide.startTime}
                                        onChange={handlePostRideChange}
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={newRide.price}
                                        onChange={handlePostRideChange}
                                        placeholder="Price"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="seatsAvailable"
                                        value={newRide.seatsAvailable}
                                        onChange={handlePostRideChange}
                                        placeholder="Seats Available"
                                        min="1"
                                        required
                                    />
                                    <input
                                        type="file"
                                        name="vehicleImage"
                                        onChange={handlePostRideChange}
                                        accept="image/*"
                                    />
                                    <button type="submit">Post Ride</button>
                                </form>
                            </div>
                        )}

                        {rides.length === 0 ? (
                            <p>No rides posted yet</p>
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
                                        <p><strong>Status:</strong> {ride.status}</p>
                                        {ride.status === 'IN_PROGRESS' && (
                                            <button 
                                                onClick={() => handleEndRide(ride.id)}
                                                className="end-ride-button"
                                            >
                                                End Ride
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'requests' && (
                    <div className="ride-requests">
                        <h2>Ride Requests</h2>
                        {requests.length === 0 ? (
                            <p>No pending requests</p>
                        ) : (
                            <div className="requests-list">
                                {requests.map(request => (
                                    <div key={request.id} className="request-card">
                                        <h3>Request #{request.id}</h3>
                                        <p><strong>Passenger:</strong> {request.passenger?.name}</p>
                                        <p><strong>Ride:</strong> #{request.ride?.id}</p>
                                        <p><strong>Status:</strong> {request.status}</p>
                                        {request.status === 'REQUESTED' && (
                                            <div className="request-actions">
                                                <button 
                                                    onClick={() => handleAcceptRequest(request.id)}
                                                    className="accept-button"
                                                >
                                                    Accept
                                                </button>
                                                <button 
                                                    onClick={() => handleRejectRequest(request.id)}
                                                    className="reject-button"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RiderDashboard;

