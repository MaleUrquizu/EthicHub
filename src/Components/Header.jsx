import React from 'react';
import '../Css/Header.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname.substring(1));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const pathname = location.pathname;
    const page = pathname.substring(1);
    setCurrentPage(page);
  }, 
  [location]);

  return (
    <div className='header-container'>
      <div className='logo-container'>
        <Link to="/">
          <img className='img-logo' src="logo.png" alt="Logo" />
        </Link>
      </div>
      <div className='navbar'>
        <ul>
          <Link to="/Ethix" onClick={() => handlePageChange('Ethix')}>
          <li className={currentPage === 'Ethix' || currentPage === '' ? 'active selected' : ''}>Ethix</li>
          </Link>
          <Link to="/Stake" onClick={() => handlePageChange('Stake')}>
            <li className={currentPage === 'Stake' ? 'active selected' : ''}>Stake</li>
          </Link>
          <Link to="/Bonds" onClick={() => handlePageChange('Bonds')}>
            <li className={currentPage === 'Bonds' ? 'active selected' : ''}>Bonds</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;

