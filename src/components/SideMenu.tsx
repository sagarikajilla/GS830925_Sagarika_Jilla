import React from "react";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";

import StoreIcon from "../assets/icons/store-solid.svg";
import SkuIcon from "../assets/icons/house-solid.svg";
import PlanningIcon from "../assets/icons/ruler-vertical-solid.svg";
import ChartIcon from "../assets/icons/chart-simple-solid.svg";

interface SideMenuProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu: React.FC<SideMenuProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  
  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <aside className={`side-menu ${isSidebarOpen ? "open" : ""}`}>
      <nav>
        <ul>
          <li>
            <NavLink to="/stores" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleLinkClick}>
              <img src={StoreIcon} alt="Stores" className="menu-icon" />
              <span>Stores</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/skus" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleLinkClick}>
              <img src={SkuIcon} alt="SKUs" className="menu-icon" />
              <span>SKUs</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/planning" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleLinkClick}>
              <img src={PlanningIcon} alt="Planning" className="menu-icon" />
              <span>Planning</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/charts" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleLinkClick}>
              <img src={ChartIcon} alt="Charts" className="menu-icon" />
              <span>Charts</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
