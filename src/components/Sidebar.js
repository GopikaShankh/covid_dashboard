import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import mypic from "./mypic1.jpeg"
import {
  FaHome,
  FaUser,
  FaInfoCircle,
  FaPhone,
  FaRegSadCry,
  FaMoon,
  FaSun,
  FaDatabase,
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const baseMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
    { name: 'About', path: '/about', icon: <FaInfoCircle /> },
    { name: 'Contact', path: '/contact', icon: <FaPhone /> },
    { name: 'All Data', path: '/all-data', icon: <FaDatabase /> },
  ];

  const menuItems =
    location.pathname === '/not-found'
      ? [...baseMenuItems, { name: 'Not Found', path: '/not-found', icon: <FaRegSadCry /> }]
      : baseMenuItems;

  const toggleSidebar = () => (isMobile ? setSidebarOpen(!sidebarOpen) : setCollapsed(!collapsed));
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    darkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [darkMode]);

  // When a menu item is clicked, close the sidebar if it's in mobile view
  const handleMenuClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {isMobile && (
        <button className="hamburger-btn" onClick={toggleSidebar}>
          {sidebarOpen ? '>' : '<'}
        </button>
      )}

      <div
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${darkMode ? 'dark' : ''} ${sidebarOpen ? 'open' : ''}`}
        aria-label="Sidebar Navigation"
      >
        <SidebarHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <SidebarProfile collapsed={collapsed} />
        <MenuItems menuItems={menuItems} collapsed={collapsed} currentPath={location.pathname} handleMenuClick={handleMenuClick} />
        <SidebarFooter collapsed={collapsed} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

const SidebarHeader = ({ collapsed, toggleSidebar }) => (
  <div className="sidebar-header">
    <h2 className="sidebar-logo">{!collapsed && 'COVID-19 Dashboard'}</h2>
    <button className="toggle-btn" onClick={toggleSidebar}>
      {collapsed ? '>' : '<'}
    </button>
  </div>
);

const SidebarProfile = ({ collapsed }) => (
  <div className="sidebar-profile">
    <img
      src={mypic}
      alt="User Profile"
      className="profile-img"
    />
    {!collapsed && (
      <>
        <h3>Gopika Shankh</h3>
        <p>React Developer</p>
      </>
    )}
  </div>
);

const MenuItems = ({ menuItems, collapsed, currentPath, handleMenuClick }) => (
  <ul className="menu-list">
    {menuItems.map((item, index) => (
      <li key={index} className={`menu-item ${currentPath === item.path ? 'active' : ''}`}>
        <Link to={item.path} onClick={handleMenuClick}>
          <span className="icon">{item.icon}</span>
          {!collapsed && <span className="text">{item.name}</span>}
        </Link>
      </li>
    ))}
  </ul>
);

const SidebarFooter = ({ collapsed, darkMode, toggleDarkMode }) => (
  <div className="sidebar-footer">
    <button className="darkmode-toggle" onClick={toggleDarkMode}>
      {darkMode ? <FaSun /> : <FaMoon />}
      {!collapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
    </button>
    {!collapsed && <div className="version">v1.0.0 &copy; 2025</div>}
  </div>
);

export default Sidebar;