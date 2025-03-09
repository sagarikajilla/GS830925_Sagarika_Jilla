import React from 'react';
import './NavigationBar.css';
import logo from '../assets/Gsynergy Logo V2 Long Description.svg';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Define props for the hamburger toggle
interface NavigationBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="nav-bar">
      {/* Hamburger button for mobile */}
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      <div className="nav-logo">
        <img src={logo} alt="GSynergy Logo" className="company-logo" />
      </div>
      <div className="nav-title">Data Viewer App</div>
      <div className="nav-right">
        {user && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
