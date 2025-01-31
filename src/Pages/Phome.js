import React from 'react';
import '../CSS/Phome.css';
import { useNavigate } from 'react-router-dom';

const Phome = ({ posts }) => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/create');
  };


  return (
    <div>
      <div className="phome">
        <h1 id='ph1'>Welcome to Your Blogging World!</h1>
        <p>Discover articles, share your thoughts, and explore diverse topics.</p>

        <button className="hbtn" onClick={handleButtonClick}>Create Post</button>
         </div>
    </div>
  );
};

export default Phome;
