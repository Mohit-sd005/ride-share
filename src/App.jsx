import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RiderDashboard from './components/RiderDashboard';
import PassengerDashboard from './components/PassengerDashboard';
import './App.css';
import './styles/animations.css';

function App() {
  return (
    <div className="app-container">
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rider-dashboard" element={<RiderDashboard />} />
            <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;