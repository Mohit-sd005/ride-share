import React from 'react';
import axios from 'axios';
import '../styles/HomePage.css';
import '../styles/animations.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      isLoginForm: true,
      email: '',
      password: '',
      role: 'PASSENGER',
      fullname: '',
      phno: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: '',
      searchDestination: '',
      searchLocation: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showPopup !== this.state.showPopup) {
      document.body.classList.toggle('popup-open', this.state.showPopup);
    }
  }

  showSignin = () => {
    this.setState({ 
      showPopup: true,
      isLoginForm: true,
      errorMessage: '',
      successMessage: '',
    });
  };

  closeSignin = (e) => {
    if (e.target.id === 'popup') {
      this.setState({ showPopup: false });
    }
  };

  toggleForm = () => {
    this.setState(prevState => ({
      isLoginForm: !prevState.isLoginForm,
      errorMessage: '',
      successMessage: '',
    }));
  };

  handleChange = (e) => {
    this.setState({ 
      [e.target.id]: e.target.value,
      errorMessage: '',
      successMessage: '',
    });
  };

  validateForm = () => {
    const { isLoginForm, email, password, role, fullname, confirmPassword, phno } = this.state;

    if (isLoginForm) {
      if (!email || !password || !role) {
        this.setState({ errorMessage: 'All fields are required' });
        return false;
      }
    } else {
      if (!fullname || !email || !role || !password || !confirmPassword) {
        this.setState({ errorMessage: 'All fields are required' });
        return false;
      }
      if (password !== confirmPassword) {
        this.setState({ errorMessage: 'Passwords do not match' });
        return false;
      }
      if (phno && !/^\d{9,15}$/.test(phno)) {
        this.setState({ errorMessage: 'Phone number must be 9-15 digits' });
        return false;
      }
    }
    return true;
  };

  handleLogin = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) return;

    try {
      const { email, password, role } = this.state;
      console.log('Attempting login with:', { email, role }); // Debug log

      const response = await axios.post('http://localhost:9010/api/users/login', {
        email,
        password,
        role,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      console.log('Login response:', response.data); // Debug log

      if (response.data) {
        // Store user data in the format expected by dashboards
        const userData = {
          id: response.data.userId,
          email: email,
          role: role,
          token: response.data.token
        };
        
        localStorage.setItem('user', JSON.stringify(userData));

        this.setState({ successMessage: 'Login successful!' });
        setTimeout(() => {
          if (role === 'RIDER') {
            window.location.href = '/rider-dashboard';
          } else {
            window.location.href = '/passenger-dashboard';
          }
        }, 1000);
      } else {
        console.error('Empty response data');
        this.setState({ errorMessage: 'Invalid response from server' });
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      let errorMsg = 'Login failed. Please try again.';
      if (error.response) {
        console.error('Error response:', error.response); // Debug log
        errorMsg = error.response.data || 'Invalid credentials or role mismatch';
      } else if (error.request) {
        console.error('No response received:', error.request); // Debug log
        errorMsg = 'No response from server. Please check your connection.';
      }
      alert(errorMsg); // TEMP: show error as alert for debugging
      this.setState({ errorMessage: errorMsg, showPopup: true, isLoginForm: true });
    }
  };

  handleSignup = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) return;

    try {
      const { fullname, email, password, phno, role } = this.state;
      console.log('Attempting signup with:', { fullname, email, role }); // Debug log

      const response = await axios.post('http://localhost:9010/api/users/signup', {
        fullname,
        email,
        password,
        phno: phno || null,
        role,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      console.log('Signup response:', response.data); // Debug log

      this.setState({
        isLoginForm: true,
        successMessage: 'Registration successful! Please log in.',
        fullname: '',
        email: '',
        password: '',
        phno: '',
        confirmPassword: '',
        role: 'PASSENGER',
      });
    } catch (error) {
      console.error('Signup error:', error); // Debug log
      let errorMsg = 'Registration failed. Please try again.';
      if (error.response) {
        console.error('Error response:', error.response); // Debug log
        errorMsg = error.response.data?.message || error.response.data || 'Registration failed';
      } else if (error.request) {
        console.error('No response received:', error.request); // Debug log
        errorMsg = 'No response from server. Please check your connection.';
      }
      this.setState({ errorMessage: errorMsg });
    }
  };

  handleSearch = async (e) => {
    e.preventDefault();
    const { searchDestination, searchLocation } = this.state;
    try {
      const response = await axios.get('http://localhost:9010/api/rides/available', {
        params: { destination: searchDestination, pickupLocation: searchLocation },
      });
      console.log('Search results:', response.data);
    } catch (error) {
      this.setState({ errorMessage: 'Search failed. Try again.' });
    }
  };

  render() {
    const { showPopup, isLoginForm, email, password, role, fullname, phno, confirmPassword, errorMessage, successMessage, searchDestination, searchLocation } = this.state;

    return (
      <div id="container">
        {showPopup && (
          <div id="popup" onClick={this.closeSignin}>
            <div id="popupWindow">
              <div id="popupheader">{isLoginForm ? 'Log In' : 'Create New Account'}</div>
              {errorMessage && (
                <div className="error-message shake">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="success-message green-tick">{successMessage}</div>
              )}
              {isLoginForm ? (
                <form id="popupsignin" onSubmit={this.handleLogin}>
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="Enter your email"
                  />
                  <label htmlFor="role">Role*</label>
                  <select id="role" value={role} onChange={this.handleChange}>
                    <option value="">Select Role</option>
                    <option value="RIDER">Rider</option>
                    <option value="PASSENGER">Passenger</option>
                  </select>
                  <label htmlFor="password">Password*</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Enter password"
                  />
                  <div className="forgot-password">Forgot <span>Password?</span></div>
                  <button type="submit" id="signinButton">Sign In</button>
                  <div className="form-footer">
                    Don't have an account? <span onClick={this.toggleForm}>Sign Up Now</span>
                  </div>
                </form>
              ) : (
                <form id="signup" onSubmit={this.handleSignup}>
                  <label htmlFor="fullname">Full Name*</label>
                  <input
                    id="fullname"
                    type="text"
                    value={fullname}
                    onChange={this.handleChange}
                    placeholder="Enter full name"
                  />
                  <label htmlFor="email">Email ID*</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="Enter email address"
                  />
                  <label htmlFor="phno">Phone Number</label>
                  <input
                    id="phno"
                    type="text"
                    value={phno}
                    onChange={this.handleChange}
                    placeholder="Enter phone number"
                  />
                  <label htmlFor="role">Select Role*</label>
                  <select id="role" value={role} onChange={this.handleChange}>
                    <option value="">Select Role</option>
                    <option value="RIDER">Rider</option>
                    <option value="PASSENGER">Passenger</option>
                  </select>
                  <label htmlFor="password">Password*</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Create password"
                  />
                  <label htmlFor="confirmPassword">Confirm Password*</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={this.handleChange}
                    placeholder="Confirm password"
                  />
                  <button type="submit" id="signupButton">Register</button>
                  <div className="form-footer">
                    Already have an Account? <span onClick={this.toggleForm}>Log In</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
        <div id="header">
          <img className="headerlogo" src="/projectlogo.png" alt="RideEasy Logo" />
          <div className="headerTitle"><span>Ride</span>Easy</div>
          <img className="signinlogo" src="/user.png" alt="Sign In Icon" onClick={this.showSignin} />
          <div className="signin" onClick={this.showSignin}>Sign In</div>
        </div>
        <div id="content">
          <div className="text1">INDIA'S #1 RIDE SHARING PLATFORM</div>
          <div className="text2">Your Ride, Your Way</div>
          <div className="text3">Find or Offer a Ride Easily</div>
          <div id="searchBar">
            <input
              id="searchText"
              type="text"
              placeholder="Search by Destination"
              value={searchDestination}
              onChange={this.handleChange}
            />
            <input
              id="searchLocation"
              type="text"
              placeholder="Pickup Location"
              value={searchLocation}
              onChange={this.handleChange}
            />
            <button id="searchButton" onClick={this.handleSearch}>Find Rides</button>
          </div>
        </div>
        <div id="footer">
          <div className="copyrighttext">© 2025 RideEasy. All rights reserved</div>
          <div className="socialmedia">
            <img src="/linkedin.png" alt="LinkedIn" />
            <img src="/twitter.png" alt="Twitter" />
            <img src="/facebook.png" alt="Facebook" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;