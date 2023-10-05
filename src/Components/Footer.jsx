import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Footer.css';
import { useState } from 'react';

 const Footer = () => {
  const [currentPage, setCurrentPage] = useState(''); 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
   return (
    <div>
      <div className='footer-container'>
        <Link to="https://www.facebook.com/EthicHubPlatform" target="_blank" className="logo-color">
          <i className="fa-brands fa-square-facebook fa-1xl"></i>
        </Link>
         <Link to="https://www.instagram.com/ethichub/" target="_blank" className="logo-color">
          <i className="fa-brands fa-instagram fa-1xl"></i>
        </Link>
         <Link to="https://twitter.com/ethichub" target="_blank" className="logo-color">
          <i className="fa-brands fa-twitter fa-1xl"></i>
        </Link>
         <Link to="https://www.youtube.com/channel/UCxLXFp8x93-ua34yZdHR-lA" target="_blank" className="logo-color">
          <i className="fa-brands fa-youtube fa-1xl"></i>
        </Link>
         <Link to="https://gitlab.com/EthicHub" target="_blank" className="logo-color">
          <i className="fa-brands fa-gitlab fa-1xl"></i>
        </Link>
         <Link to="https://discord.io/Ethichub" target="_blank" className="logo-color">
          <i className="fa-brands fa-discord fa-1xl"></i>
        </Link>
         <Link to="https://t.me/ethichub" target="_blank" className="logo-color">
          <i className="fa-brands fa-telegram fa-1xl"></i>
        </Link>
         <Link to="https://www.linkedin.com/company/ethichub/" target="_blank" className="logo-color">
          <i className="fa-brands fa-linkedin fa-1xl"></i>
        </Link>
      </div>
       <div className='footer-links'>
        <div>
          <Link to="https://www.ethichub.com/es/politica-de-cookies" target="_blank" className="politic-links">Cookies Policy</Link>
        </div>
         <div className='politics-container'>
          <Link to="https://www.ethichub.com/es/politica-de-privacidad?hsLang=es" target="_blank" className="politic-links">Privacy Policy</Link>
          <p>Crypto Café, Calle Bastero 13, Madrid, Spain.</p>
          <p>All Rights Reserved. Ethichub 2023 ®</p>
        </div>
         <div>
          <Link to="https://www.ethichub.com/es/terminos-y-condiciones?hsLang=es" target="_blank" className="politic-links">Terms and Conditions</Link>
        </div>
      </div>
    </div>
  );
};
 export default Footer;