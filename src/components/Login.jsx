import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:9010/api/auth/login', formData, {
                withCredentials: true
            });

            if (response.data) {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(response.data));
                
                // Redirect based on role
                if (response.data.role === 'RIDER') {
                    navigate('/rider-dashboard');
                } else if (response.data.role === 'PASSENGER') {
                    navigate('/passenger-dashboard');
                } else {
                    setError('Invalid user role');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        setError('Invalid email or password');
                        break;
                    case 400:
                        setError('Please fill in all fields');
                        break;
                    default:
                        setError('Login failed. Please try again.');
                }
            } else {
                setError('Network error. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login to RideEasy</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login; 