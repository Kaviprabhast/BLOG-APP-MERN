import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/IndexPage.css';

const IndexPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login'); 
  };

  return (
    <div>
      <section className="intro-section">
        <h1>Welcome to Blog Diaries!!!</h1>
        <p>
          Explore the latest posts, share your thoughts, and stay updated with interesting content.
        </p>
      </section>
      <br />
      <button id='btn' onClick={handleButtonClick}>Let's get Started</button>
    </div>
  );
};

export default IndexPage;
