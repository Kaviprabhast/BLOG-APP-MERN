import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import QRCode from 'react-qr-code';  
import './CSS/Profile.css';

const Profile = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    onLogout();
    setIsOpen(false); 
    navigate('/login');  
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate('/home');
  };

  if (!user || !user.name) return null;  

  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <>
      {isOpen && (
        <div className="profile-container">
          <div className="profile-header">
            <h3>Profile</h3>
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="profile-content">
            <div className="profile-pic">
              {firstLetter} 
            </div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-portfolio">
              <a href={user.portfolio} target="_blank" rel="noopener noreferrer">
                {user.portfolio}
              </a>
            </p>
            <div className="qr-code">
              <QRCode value={user.portfolio} />
            </div>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
