
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import SideMenu from './components/SideMenu';
import StoresPage from './pages/StoresPage';
import SKUsPage from './pages/SKUsPage';
import PlanningPage from './pages/PlanningPage';
import ChartPage from './pages/ChartPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App: React.FC = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="app-container">
                {/* Pass isSidebarOpen and toggle function to NavigationBar */}
                <NavigationBar
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                />
                <div className="main-layout">
                  {/* Pass isSidebarOpen and toggle function to SideMenu */}
                  <SideMenu
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                  />
                  <div className="page-content">
                    <Routes>
                      <Route path="/stores" element={<StoresPage />} />
                      <Route path="/skus" element={<SKUsPage />} />
                      <Route path="/planning" element={<PlanningPage />} />
                      <Route path="/charts" element={<ChartPage />} />
                      <Route path="/" element={<StoresPage />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
